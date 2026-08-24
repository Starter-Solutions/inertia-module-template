export interface ModuleUrlOptions {
    baseUrl?: string
}

export function createModuleUrl(path = '', options: ModuleUrlOptions = {}): string {
    const baseUrl = options.baseUrl ?? '/{{MODULE_SLUG}}'
    const normalizedBase = `/${baseUrl}`.replace(/\/{2,}/g, '/').replace(/\/$/, '')
    const normalizedPath = path.replace(/^\/+/, '')

    return normalizedPath === '' ? normalizedBase || '/' : `${normalizedBase}/${normalizedPath}`
}

export { router, useForm, usePage } from '@inertiajs/vue3'
