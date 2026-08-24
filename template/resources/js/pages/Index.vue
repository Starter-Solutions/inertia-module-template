<script setup>
import { Head } from '@inertiajs/vue3'
import ModuleShell from '../components/ModuleShell.vue'
</script>

<template>
    <Head title="{{MODULE_TITLE}}" />

    <ModuleShell
        title="{{MODULE_TITLE}}"
        description="Your Laravel and Inertia module is ready. Start building your first page here."
    >
        <div class="inertia-module-empty">
            <div class="inertia-module-empty-mark" aria-hidden="true">◇</div>
            <h2>Module ready</h2>
            <p>
                This page is loaded directly from the module package through
                the host application's Inertia resolver.
            </p>
        </div>

        <template #footer>
            {{ORGANIZATION_TITLE}} · {{MODULE_TITLE}}
        </template>
    </ModuleShell>
</template>
