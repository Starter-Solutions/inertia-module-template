const pages = import.meta.glob('./pages/**/*.vue')
const prefix = '{{MODULE_NAME}}::'

export function resolveModulePage(name) {
    if (!name.startsWith(prefix)) {
        return undefined
    }

    const pageName = name.slice(prefix.length)
    const path = `./pages/${pageName}.vue`
    const resolve = pages[path]

    if (!resolve) {
        throw new Error(`Unknown {{MODULE_TITLE}} Inertia page: ${pageName}`)
    }

    return resolve()
}
