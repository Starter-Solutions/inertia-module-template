<script setup lang="ts">
import { Link, Head } from '@inertiajs/vue3'
import { Badge } from '@starter-solutions/vue-ui/base/badge'
import { Button } from '@starter-solutions/vue-ui/base/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@starter-solutions/vue-ui/base/card'
import ModuleShell from '../../components/ModuleShell.vue'
import { useExample } from '../../composables/index'

const { examples, urls } = useExample()
</script>

<template>
    <Head title="{{MODULE_TITLE}} examples" />

    <ModuleShell
        title="Examples"
        description="A small end-to-end example loaded directly from the module package."
    >
        <template #actions>
            <Button as-child>
                <Link :href="urls.create()">New example</Link>
            </Button>
        </template>

        <Card v-if="examples.length === 0">
            <CardHeader class="items-center py-16 text-center">
                <CardTitle>No example records yet</CardTitle>
                <CardDescription>Run the module's example seeder and refresh this page.</CardDescription>
            </CardHeader>
        </Card>

        <ul v-else class="grid gap-4">
            <li
                v-for="example in examples"
                :key="example.id"
            >
                <Link :href="urls.show(example.id)" class="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Card class="transition-colors hover:bg-accent/50">
                        <CardContent class="flex items-center gap-4 py-6">
                            <Badge variant="secondary">#{{ example.id }}</Badge>
                            <div class="min-w-0 flex-1">
                                <p class="font-medium">{{ example.title }}</p>
                                <p class="truncate text-sm text-muted-foreground">{{ example.description }}</p>
                            </div>
                            <span class="text-muted-foreground" aria-hidden="true">→</span>
                        </CardContent>
                    </Card>
                </Link>
            </li>
        </ul>

        <template #footer>
            {{ examples.length }} example{{ examples.length === 1 ? '' : 's' }} provided by the module
        </template>
    </ModuleShell>
</template>
