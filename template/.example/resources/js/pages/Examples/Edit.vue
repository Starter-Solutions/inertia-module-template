<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { Button } from '@starter-solutions/vue-ui/base/button'
import { Card, CardContent, CardFooter } from '@starter-solutions/vue-ui/base/card'
import { Input } from '@starter-solutions/vue-ui/base/input'
import { Label } from '@starter-solutions/vue-ui/base/label'
import { Textarea } from '@starter-solutions/vue-ui/base/textarea'
import ModuleShell from '../../components/ModuleShell.vue'
import { useExample } from '../../composables/index'

const exampleApi = useExample()
const example = exampleApi.example
const form = exampleApi.form(example.value ?? {})
const submit = () => {
    if (example.value) {
        exampleApi.patch(example.value.id, form)
    }
}
</script>

<template>
    <Head :title="`Edit ${example?.title ?? 'example'}`" />
    <ModuleShell :title="`Edit ${example?.title ?? 'example'}`" description="Update this record through the module's controller endpoint.">
        <template #actions>
            <Button v-if="example" variant="outline" as-child>
                <Link :href="exampleApi.urls.show(example.id)">Cancel</Link>
            </Button>
        </template>
        <Card>
            <form @submit.prevent="submit">
                <CardContent class="grid gap-6 pt-6">
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input id="title" v-model="form.title" maxlength="255" autofocus />
                        <p v-if="form.errors.title" class="text-sm text-destructive">{{ form.errors.title }}</p>
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <Textarea id="description" v-model="form.description" rows="6" />
                        <p v-if="form.errors.description" class="text-sm text-destructive">{{ form.errors.description }}</p>
                    </div>
                </CardContent>
                <CardFooter class="justify-end">
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Saving…' : 'Save changes' }}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </ModuleShell>
</template>
