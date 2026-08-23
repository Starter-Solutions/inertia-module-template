# @starter-solutions/inertia-modules

Automatically discovers Inertia pages provided by Composer packages. Module
pages remain inside `vendor/`; no files are copied into the host application and
no custom resolver is required in `app.ts`.

## Installation

```bash
npm install --save-dev @starter-solutions/inertia-modules
```

Register the plugin before the official Inertia plugin:

```ts
import inertia from '@inertiajs/vite'
import inertiaModules from '@starter-solutions/inertia-modules'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        inertiaModules(),
        inertia(),
    ],
})
```

The host application can keep its minimal setup:

```ts
import { createInertiaApp } from '@inertiajs/vue3'

createInertiaApp()
```

The plugin discovers module entries matching
`../../vendor/*/*/resources/js/inertia.js`, keeps the host's standard `pages`
and `Pages` directories working, lazy-loads page components, and preserves
Composer path-repository symlinks.

## Options

```ts
inertiaModules({
    modules: '../../vendor/*/*/resources/js/inertia.js',
    pages: ['./pages/**/*.vue', './Pages/**/*.vue'],
    preserveSymlinks: true,
})
```

## Publishing

Push a new version in this package's `package.json` to `main`. The repository's
GitHub Actions workflow runs the tests, checks whether that exact version exists
on npm, and publishes it with provenance when it is new.

The repository must provide an npm automation token as the `NPM_TOKEN` Actions
secret. Publishing an existing version is skipped safely.
