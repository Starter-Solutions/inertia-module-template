<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3'
import ModuleShell from '../../Components/ModuleShell.vue'

const props = defineProps({
    indexUrl: { type: String, required: true },
    storeUrl: { type: String, required: true },
})

const form = useForm({ title: '', description: '' })
const submit = () => form.post(props.storeUrl)
</script>

<template>
    <Head title="Create example" />
    <ModuleShell title="Create example" description="Add a record using a form that lives entirely inside the module package.">
        <template #actions>
            <Link :href="indexUrl" class="inertia-module-button">Cancel</Link>
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
                    {{ form.processing ? 'Creating…' : 'Create example' }}
                </button>
            </div>
        </form>
    </ModuleShell>
</template>
