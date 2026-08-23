<script setup>
import { Link, Head } from '@inertiajs/vue3'
import ModuleShell from '../../Components/ModuleShell.vue'

defineProps({
    examples: {
        type: Array,
        required: true,
    },
})
</script>

<template>
    <Head title="{{MODULE_TITLE}} examples" />

    <ModuleShell
        title="Examples"
        description="A small end-to-end example loaded directly from the module package."
    >
        <div v-if="examples.length === 0" class="inertia-module-empty">
            <div class="inertia-module-empty-mark" aria-hidden="true">◇</div>
            <h2>No example records yet</h2>
            <p>Run the module's example seeder and refresh this page.</p>
        </div>

        <ul v-else class="inertia-module-list">
            <li
                v-for="example in examples"
                :key="example.id"
                class="inertia-module-list-item"
            >
                <Link :href="example.url" class="inertia-module-card-link">
                    <span class="inertia-module-badge">{{ example.id }}</span>
                    <span>
                        <span class="inertia-module-card-title">{{ example.title }}</span>
                        <span class="inertia-module-card-copy">{{ example.description }}</span>
                    </span>
                    <span class="inertia-module-arrow" aria-hidden="true">→</span>
                </Link>
            </li>
        </ul>

        <template #footer>
            {{ examples.length }} example{{ examples.length === 1 ? '' : 's' }} provided by the module
        </template>
    </ModuleShell>
</template>
