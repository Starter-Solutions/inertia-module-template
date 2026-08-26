<script setup lang="ts">
import { Link, Head } from '@inertiajs/vue3'
import { Badge } from '@starter-solutions/vue-ui/base/badge'
import { Button } from '@starter-solutions/vue-ui/base/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@starter-solutions/vue-ui/base/card'
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
            <Button variant="outline" as-child>
                <Link :href="exampleApi.urls.index()">← All examples</Link>
            </Button>
            <Button v-if="example" as-child>
                <Link :href="exampleApi.urls.edit(example.id)">Edit example</Link>
            </Button>
            <Button v-if="example" type="button" variant="destructive" @click="destroy">Delete example</Button>
        </template>

        <Card v-if="example">
            <CardHeader>
                <Badge variant="secondary" class="w-fit">Example #{{ example.id }}</Badge>
                <CardTitle>About this example</CardTitle>
                <CardDescription>This record is provided by the module.</CardDescription>
            </CardHeader>
            <CardContent class="leading-7 text-muted-foreground">{{ example.description }}</CardContent>
        </Card>
    </ModuleShell>
</template>
