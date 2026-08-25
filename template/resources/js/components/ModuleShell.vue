<script setup>
import '@starter-solutions/vue-ui/styles.css'
import '../../css/module.css'

defineProps({
    eyebrow: {
        type: String,
        default: '{{MODULE_TITLE}}',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <div class="inertia-module-shell">
        <main class="inertia-module-container">
            <header class="inertia-module-header">
                <div>
                    <p class="inertia-module-eyebrow">{{ eyebrow }}</p>
                    <h1 class="inertia-module-title">{{ title }}</h1>
                    <p v-if="description" class="inertia-module-description">
                        {{ description }}
                    </p>
                </div>

                <div v-if="$slots.actions" class="inertia-module-actions">
                    <slot name="actions" />
                </div>
            </header>

            <section class="inertia-module-panel">
                <slot />
            </section>

            <footer v-if="$slots.footer" class="inertia-module-footer">
                <slot name="footer" />
            </footer>
        </main>
    </div>
</template>
