import assert from 'node:assert/strict'
import test from 'node:test'
import inertiaModules from '../index.js'

function transform(source, id = '/app/resources/js/app.ts') {
    const plugin = inertiaModules()
    return plugin.transform.call({ warn() {} }, source, id)
}

test('injects a resolver into an empty createInertiaApp call', () => {
    const result = transform(`
        import { createInertiaApp } from '@inertiajs/vue3'
        createInertiaApp()
    `)

    assert.match(result.code, /createInertiaApp\(\{ resolve: __resolveInertiaModulePage \}\)/)
    assert.match(result.code, /vendor\/\*\/\*\/resources\/js\/inertia\.js/)
})

test('injects a resolver while retaining existing options', () => {
    const result = transform(`
        import { createInertiaApp as boot } from '@inertiajs/vue3'
        boot<{ user: string }>({ title: (title) => title })
    `)

    assert.match(result.code, /boot<\{ user: string \}>\(\{ resolve: __resolveInertiaModulePage, title:/)
})

test('supports generic calls whose type contains a function', () => {
    const result = transform(`
        import { createInertiaApp } from '@inertiajs/vue3'
        createInertiaApp<{ callback: () => void }>()
    `)

    assert.match(result.code, /createInertiaApp<\{ callback: \(\) => void \}>\(\{ resolve: __resolveInertiaModulePage \}\)/)
})

test('does not override an explicit resolver', () => {
    const plugin = inertiaModules()
    const warnings = []
    const result = plugin.transform.call(
        { warn(message) { warnings.push(message) } },
        `import { createInertiaApp } from '@inertiajs/vue3'; createInertiaApp({ resolve: customResolver })`,
        '/app/resources/js/app.ts',
    )

    assert.equal(result, null)
    assert.equal(warnings.length, 1)
})

test('enables symlink preservation by default', () => {
    assert.deepEqual(inertiaModules().config(), {
        resolve: {
            preserveSymlinks: true,
        },
    })
})
