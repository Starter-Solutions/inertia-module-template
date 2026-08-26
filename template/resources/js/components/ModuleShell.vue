<script setup>
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
    <div class="min-h-screen bg-background px-5 py-8 text-foreground sm:py-16 lg:py-24">
        <main class="mx-auto w-full max-w-5xl">
            <header class="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p class="mb-2 text-xs font-semibold tracking-widest text-primary uppercase">
                        {{ eyebrow }}
                    </p>
                    <h1 class="text-3xl font-bold tracking-tight sm:text-5xl">
                        {{ title }}
                    </h1>
                    <p
                        v-if="description"
                        class="mt-4 max-w-2xl text-base leading-7 text-muted-foreground"
                    >
                        {{ description }}
                    </p>
                </div>

                <div v-if="$slots.actions" class="flex flex-wrap gap-3">
                    <slot name="actions" />
                </div>
            </header>

            <section>
                <slot />
            </section>

            <footer
                v-if="$slots.footer"
                class="mt-5 text-center text-sm text-muted-foreground"
            >
                <slot name="footer" />
            </footer>
        </main>
    </div>
</template>
