import type { Plugin } from 'vite'

export interface InertiaModulesOptions {
    /** Glob used to discover module-owned Inertia entry points. */
    modules?: string

    /** Host application page directories, relative to its JavaScript entry. */
    pages?: string[]

    /** Preserve Composer path-repository symlinks. Defaults to true. */
    preserveSymlinks?: boolean
}

export default function inertiaModules(options?: InertiaModulesOptions): Plugin
