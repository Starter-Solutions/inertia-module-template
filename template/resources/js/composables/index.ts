import { computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { createModuleUrl, type ModuleUrlOptions } from '../inertia/index'

type VisitOptions = NonNullable<Parameters<typeof router.visit>[1]>
type ReloadOptions = NonNullable<Parameters<typeof router.reload>[0]>

export interface ModuleNavigationOptions extends ModuleUrlOptions {}

export function useModuleNavigation(options: ModuleNavigationOptions = {}) {
    const page = usePage()
    const url = (path = '') => createModuleUrl(path, options)
    const isCurrent = (path = '') => computed(() => page.url.startsWith(url(path)))

    return {
        page,
        url,
        isCurrent,
        visit(path = '', visitOptions: VisitOptions = {}) {
            router.visit(url(path), visitOptions)
        },
        reload(reloadOptions: ReloadOptions = {}) {
            router.reload(reloadOptions)
        },
    }
}
