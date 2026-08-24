<script setup>
import { Link, Head } from '@inertiajs/vue3'
import ModuleShell from '../../components/ModuleShell.vue'

defineProps({
    example: {
        type: Object,
        required: true,
    },
    indexUrl: {
        type: String,
        required: true,
    },
    editUrl: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <Head :title="example.title" />

    <ModuleShell
        :title="example.title"
        description="This detail page is rendered by the module's controller and Vue frontend."
    >
        <template #actions>
            <Link :href="indexUrl" class="inertia-module-button">
                <span aria-hidden="true">←</span>
                All examples
            </Link>
            <Link :href="editUrl" class="inertia-module-button inertia-module-button-primary">
                Edit example
            </Link>
        </template>

        <article class="inertia-module-detail">
            <div class="inertia-module-meta">
                <span>Example record</span>
                <span aria-hidden="true">·</span>
                <span>#{{ example.id }}</span>
            </div>
            <h2>About this example</h2>
            <p>{{ example.description }}</p>
        </article>
    </ModuleShell>
</template>
