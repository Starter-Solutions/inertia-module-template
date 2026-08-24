import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            include: ['resources/js/**/*.ts', 'resources/js/**/*.vue'],
            insertTypesEntry: true,
            rollupTypes: false,
        }),
    ],
    build: {
        lib: {
            entry: {
                index: 'resources/js/index.ts',
                'components/index': 'resources/js/components/index.ts',
                'composables/index': 'resources/js/composables/index.ts',
                'utils/index': 'resources/js/utils/index.ts',
            },
            formats: ['es'],
            cssFileName: 'module',
        },
        rollupOptions: {
            external: ['vue', '@inertiajs/vue3'],
            output: {
                entryFileNames: '[name].js',
            },
        },
    },
})
