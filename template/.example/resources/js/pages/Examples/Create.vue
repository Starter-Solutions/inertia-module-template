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
const form = exampleApi.form()
const submit = () => exampleApi.post(form)
</script>

<template>
    <Head title="Create example" />
    <ModuleShell title="Create example" description="Add a record using a form that lives entirely inside the module package.">
        <template #actions>
            <Button variant="outline" as-child>
                <Link :href="exampleApi.urls.index()">Cancel</Link>
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
                        {{ form.processing ? 'Creating…' : 'Create example' }}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </ModuleShell>
</template>
