<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3'
import ModuleShell from '../../Components/ModuleShell.vue'

const props = defineProps({
    example: { type: Object, required: true },
    showUrl: { type: String, required: true },
    updateUrl: { type: String, required: true },
})

const form = useForm({
    title: props.example.title,
    description: props.example.description ?? '',
})
const submit = () => form.put(props.updateUrl)
</script>

<template>
    <Head :title="`Edit ${example.title}`" />
    <ModuleShell :title="`Edit ${example.title}`" description="Update this record through the module's controller endpoint.">
        <template #actions>
            <Link :href="showUrl" class="inertia-module-button">Cancel</Link>
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
