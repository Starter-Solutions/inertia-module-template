<script setup>
import { Head } from '@inertiajs/vue3'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@starter-solutions/vue-ui/base/card'
import { Button } from '@starter-solutions/vue-ui/base/button'
import { ThemeSwitch } from '@starter-solutions/vue-ui/custom/theme-switch'
import { useDisclosure } from '@starter-solutions/vue-ui/composables'
import ModuleShell from '../components/ModuleShell.vue'

const details = useDisclosure()
</script>

<template>
    <Head title="{{MODULE_TITLE}}" />

    <ModuleShell
        title="{{MODULE_TITLE}}"
        description="Your Laravel and Inertia module is ready. Start building your first page here."
    >
        <template #actions>
            <ThemeSwitch />
        </template>

        <div class="inertia-module-empty">
            <Card class="inertia-module-ui-card">
                <CardHeader>
                    <CardTitle>Module ready</CardTitle>
                    <CardDescription>
                        This page uses the shared open-source
                        @starter-solutions/vue-ui package.
                    </CardDescription>
                </CardHeader>

                <CardContent v-if="details.isOpen.value">
                    This page is loaded directly from the module package through
                    the host application's Inertia resolver.
                </CardContent>

                <CardFooter>
                    <Button variant="outline" @click="details.toggle">
                        {{ details.isOpen.value ? 'Hide details' : 'Show details' }}
                    </Button>
                </CardFooter>
            </Card>
        </div>

        <template #footer>
            {{ORGANIZATION_TITLE}} · {{MODULE_TITLE}}
        </template>
    </ModuleShell>
</template>
