import { computed } from 'vue'
import { router, useForm, usePage } from '@inertiajs/vue3'
import { createModuleUrl, type ModuleUrlOptions } from '../utils/index'

export interface ExampleRecord {
    id: number | string
    title: string
    description: string | null
}

export interface ExamplePayload {
    title: string
    description: string
}

export interface ExamplePageProps {
    [key: string]: unknown
    examples?: ExampleRecord[]
    example?: ExampleRecord
}

export interface ExampleOptions extends ModuleUrlOptions {}

export function createExampleForm(values: { title?: string; description?: string | null } = {}) {
    return useForm<ExamplePayload>({
        title: values.title ?? '',
        description: values.description ?? '',
    })
}

type ExampleForm = ReturnType<typeof createExampleForm>
type GetOptions = NonNullable<Parameters<typeof router.get>[2]>
type DeleteOptions = NonNullable<Parameters<typeof router.delete>[1]>
type ReloadOptions = NonNullable<Parameters<typeof router.reload>[0]>
type FormSubmitOptions = NonNullable<Parameters<ExampleForm['post']>[1]>

export function useExample(options: ExampleOptions = {}) {
    const page = usePage<ExamplePageProps>()
    const url = (path = '') => createModuleUrl(path, options)
    const resourceUrl = (path = '') => url(`examples${path}`)

    const urls = {
        index: () => resourceUrl(),
        create: () => resourceUrl('/create'),
        store: () => resourceUrl(),
        show: (id: ExampleRecord['id']) => resourceUrl(`/${id}`),
        edit: (id: ExampleRecord['id']) => resourceUrl(`/${id}/edit`),
        update: (id: ExampleRecord['id']) => resourceUrl(`/${id}`),
        destroy: (id: ExampleRecord['id']) => resourceUrl(`/${id}`),
    }

    return {
        page,
        examples: computed(() => page.props.examples ?? []),
        example: computed(() => page.props.example),
        url,
        urls,
        isCurrent: (path = '') => computed(() => page.url.startsWith(resourceUrl(path))),
        form: createExampleForm,
        index(visitOptions: GetOptions = {}) {
            router.get(urls.index(), {}, visitOptions)
        },
        create(visitOptions: GetOptions = {}) {
            router.get(urls.create(), {}, visitOptions)
        },
        show(id: ExampleRecord['id'], visitOptions: GetOptions = {}) {
            router.get(urls.show(id), {}, visitOptions)
        },
        edit(id: ExampleRecord['id'], visitOptions: GetOptions = {}) {
            router.get(urls.edit(id), {}, visitOptions)
        },
        post(form: ExampleForm, submitOptions: FormSubmitOptions = {}) {
            form.post(urls.store(), submitOptions)
        },
        patch(id: ExampleRecord['id'], form: ExampleForm, submitOptions: FormSubmitOptions = {}) {
            form.patch(urls.update(id), submitOptions)
        },
        delete(id: ExampleRecord['id'], visitOptions: DeleteOptions = {}) {
            router.delete(urls.destroy(id), visitOptions)
        },
        reload(reloadOptions: ReloadOptions = {}) {
            router.reload(reloadOptions)
        },
    }
}
