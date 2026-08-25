<script setup lang="ts">
import { Link, Head } from '@inertiajs/vue3'
import ModuleShell from '../../components/ModuleShell.vue'
import { useExample } from '../../composables/index'

const exampleApi = useExample()
const example = exampleApi.example
const destroy = () => {
    if (example.value && window.confirm(`Delete ${example.value.title}?`)) {
        exampleApi.delete(example.value.id)
    }
}
</script>

<template>
    <Head :title="example?.title ?? 'Example'" />

    <ModuleShell
        :title="example?.title ?? 'Example'"
        description="This detail page is rendered by the module's controller and Vue frontend."
    >
        <template #actions>
            <Link :href="exampleApi.urls.index()" class="inertia-module-button">
                <span aria-hidden="true">←</span>
                All examples
            </Link>
            <Link v-if="example" :href="exampleApi.urls.edit(example.id)" class="inertia-module-button inertia-module-button-primary">
                Edit example
            </Link>
            <button v-if="example" type="button" class="inertia-module-button" @click="destroy">
                Delete example
            </button>
        </template>

        <article v-if="example" class="inertia-module-detail">
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
