import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            include: ['resources/js/**/*.ts'],
            insertTypesEntry: true,
            rollupTypes: false,
        }),
    ],
    build: {
        lib: {
            entry: {
                index: 'resources/js/index.ts',
                'composables/index': 'resources/js/composables/index.ts',
                'inertia/index': 'resources/js/inertia/index.ts',
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: ['vue', '@inertiajs/vue3'],
            output: {
                entryFileNames: '[name].js',
            },
        },
    },
})
