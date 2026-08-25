<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import ModuleShell from '../../components/ModuleShell.vue'
import { useExample } from '../../composables/index'

const exampleApi = useExample()
const example = exampleApi.example
const form = exampleApi.form(example.value ?? {})
const submit = () => {
    if (example.value) {
        exampleApi.patch(example.value.id, form)
    }
}
</script>

<template>
    <Head :title="`Edit ${example?.title ?? 'example'}`" />
    <ModuleShell :title="`Edit ${example?.title ?? 'example'}`" description="Update this record through the module's controller endpoint.">
        <template #actions>
            <Link v-if="example" :href="exampleApi.urls.show(example.id)" class="inertia-module-button">Cancel</Link>
        </template>
        <form class="inertia-module-form" @submit.prevent="submit">
            <label class="inertia-module-field">
                <span>Title</span>
                <input v-model="form.title" type="text" maxlength="255" autofocus />
                <small v-if="form.errors.title" class="inertia-module-error">{{ form.errors.title }}</small>
            </label>
            <label class="inertia-module-field">
                <span>Description</span>
                <textarea v-model="form.description" rows="6"></textarea>
                <small v-if="form.errors.description" class="inertia-module-error">{{ form.errors.description }}</small>
            </label>
            <div class="inertia-module-form-actions">
                <button type="submit" class="inertia-module-button inertia-module-button-primary" :disabled="form.processing">
                    {{ form.processing ? 'Saving…' : 'Save changes' }}
                </button>
            </div>
        </form>
    </ModuleShell>
</template>
