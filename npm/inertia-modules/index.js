import { parse } from '@babel/parser'
import MagicString from 'magic-string'

const DEFAULT_MODULES = '../../vendor/*/*/resources/js/inertia.js'
const DEFAULT_PAGES = ['./pages/**/*.vue', './Pages/**/*.vue']
const INERTIA_ADAPTERS = new Set([
    '@inertiajs/vue3',
    '@inertiajs/react',
    '@inertiajs/svelte',
])

function walk(node, visit) {
    if (!node || typeof node !== 'object') {
        return
    }

    visit(node)

    for (const [key, value] of Object.entries(node)) {
        if (key === 'loc' || key === 'extra' || key === 'errors') {
            continue
        }

        if (Array.isArray(value)) {
            value.forEach((child) => walk(child, visit))
        } else if (value && typeof value === 'object' && typeof value.type === 'string') {
            walk(value, visit)
        }
    }
}

function propertyName(property) {
    if (property?.type !== 'ObjectProperty' && property?.type !== 'ObjectMethod') {
        return undefined
    }

    if (property.key.type === 'Identifier') {
        return property.key.name
    }

    if (property.key.type === 'StringLiteral') {
        return property.key.value
    }

    return undefined
}

function resolverSource(modules, pages) {
    return `
const __inertiaModuleEntries = import.meta.glob(${JSON.stringify(modules)}, { eager: true })
const __inertiaHostPages = import.meta.glob(${JSON.stringify(pages)})

async function __resolveInertiaModulePage(name, page) {
    for (const inertiaModule of Object.values(__inertiaModuleEntries)) {
        const resolved = inertiaModule.resolveModulePage?.(name, page)

        if (resolved) {
            return resolved
        }
    }

    const hostPage = __inertiaHostPages[\`./pages/\${name}.vue\`]
        ?? __inertiaHostPages[\`./Pages/\${name}.vue\`]

    if (!hostPage) {
        throw new Error(\`Inertia page not found: \${name}\`)
    }

    return hostPage()
}
`
}

export default function inertiaModules(options = {}) {
    const modules = options.modules ?? DEFAULT_MODULES
    const pages = options.pages ?? DEFAULT_PAGES
    const preserveSymlinks = options.preserveSymlinks ?? true

    return {
        name: '@starter-solutions/inertia-modules',
        enforce: 'pre',

        config() {
            if (!preserveSymlinks) {
                return undefined
            }

            return {
                resolve: {
                    preserveSymlinks: true,
                },
            }
        },

        transform(code, id) {
            if (!/\.[cm]?[jt]sx?$/.test(id) || !code.includes('createInertiaApp')) {
                return null
            }

            let ast

            try {
                ast = parse(code, {
                    sourceType: 'module',
                    plugins: ['typescript', 'jsx', 'decorators-legacy'],
                })
            } catch {
                return null
            }

            const localNames = new Set()

            for (const statement of ast.program.body) {
                if (statement.type !== 'ImportDeclaration' || !INERTIA_ADAPTERS.has(statement.source.value)) {
                    continue
                }

                for (const specifier of statement.specifiers) {
                    if (
                        specifier.type === 'ImportSpecifier'
                        && specifier.imported.type === 'Identifier'
                        && specifier.imported.name === 'createInertiaApp'
                    ) {
                        localNames.add(specifier.local.name)
                    }
                }
            }

            if (localNames.size === 0) {
                return null
            }

            const calls = []

            walk(ast.program, (node) => {
                if (
                    node.type === 'CallExpression'
                    && node.callee.type === 'Identifier'
                    && localNames.has(node.callee.name)
                ) {
                    calls.push(node)
                }
            })

            if (calls.length === 0) {
                return null
            }

            const output = new MagicString(code)
            let transformed = false

            for (const call of calls) {
                if (call.arguments.length === 0) {
                    const typeParametersEnd = call.typeParameters?.end ?? call.typeArguments?.end
                    const openingParenthesis = code.indexOf('(', typeParametersEnd ?? call.callee.end)
                    output.appendLeft(openingParenthesis + 1, '{ resolve: __resolveInertiaModulePage }')
                    transformed = true
                    continue
                }

                const optionsArgument = call.arguments[0]

                if (optionsArgument.type !== 'ObjectExpression') {
                    this.warn(`Unable to auto-hook Inertia modules in ${id}: createInertiaApp() must receive an object literal.`)
                    continue
                }

                const configuredProperties = new Set(optionsArgument.properties.map(propertyName))

                if (configuredProperties.has('resolve') || configuredProperties.has('pages')) {
                    this.warn(`Skipped automatic Inertia module resolver in ${id}: an explicit resolve or pages option already exists.`)
                    continue
                }

                output.appendLeft(optionsArgument.start + 1, ' resolve: __resolveInertiaModulePage,')
                transformed = true
            }

            if (!transformed) {
                return null
            }

            const lastImport = [...ast.program.body]
                .reverse()
                .find((statement) => statement.type === 'ImportDeclaration')
            const insertionPoint = lastImport?.end ?? 0
            output.appendLeft(insertionPoint, resolverSource(modules, pages))

            return {
                code: output.toString(),
                map: output.generateMap({ hires: true, source: id }),
            }
        },
    }
}
