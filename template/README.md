# {{MODULE_TITLE}}

`{{ORGANIZATION_SLUG}}/{{MODULE_SLUG}}` is a self-contained Laravel and Inertia.js
module. Its Composer package provides the backend and optional module pages;
`@{{ORGANIZATION_SLUG}}/{{MODULE_SLUG}}` provides the public, headless frontend
API. Both artifacts are released with the same version.

## Requirements

- PHP 8.3 or newer
- Composer
- Node.js and npm
- Laravel 12 or 13
- An application with Inertia.js configured

## Installation

Install the module in the consuming Laravel application:

```bash
composer require {{ORGANIZATION_SLUG}}/{{MODULE_SLUG}}
```

Install its headless frontend SDK from GitHub Packages:

```ini
# .npmrc in the host application
@{{ORGANIZATION_SLUG}}:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```bash
npm install @{{ORGANIZATION_SLUG}}/{{MODULE_SLUG}}
```

`NODE_AUTH_TOKEN` needs permission to read packages from the GitHub
organization. The SDK exports Inertia-native helpers and UI-free composables.
It does not use Axios, `fetch`, or a separate JSON API:

```ts
import {
    useForm,
    useModuleNavigation,
} from '@{{ORGANIZATION_SLUG}}/{{MODULE_SLUG}}'

const module = useModuleNavigation({
    baseUrl: '/{{MODULE_SLUG}}',
})

const form = useForm({ name: '' })

form.post(module.url('/examples'))
module.visit('/examples')
```

Add domain-specific types and composables under `resources/js/composables/`.
They can read server props with `usePage()`, submit with `useForm()`, and
navigate with the Inertia router. They are part of the public SDK; Vue
components and layouts in the host remain entirely replaceable.

Laravel loads `{{ORGANIZATION_NAME}}\{{MODULE_NAME}}\{{MODULE_NAME}}ServiceProvider`
automatically through package discovery.

### Route prefix

Module routes use `/{{MODULE_SLUG}}` as their default base URL. Publish the
configuration to replace the module slug with a different prefix:

```bash
php artisan vendor:publish --tag={{MODULE_SLUG}}-config
```

Then edit `config/{{MODULE_SLUG}}.php`:

```php
'route_prefix' => 'features',
```

This changes an example page URL from `/{{MODULE_SLUG}}/examples` to
`/features/examples`. The configured value replaces the module slug; it is not
added in front of it. Set the value to an empty string to expose the page as
`/examples`.

The Vue pages remain inside this package. Install the shared Vite plugin in the
host application:

```bash
npm install --save-dev @starter-solutions/inertia-modules
```

Register it before the official Inertia plugin in `vite.config.ts`:

```ts
import inertia from '@inertiajs/vite'
import inertiaModules from '@starter-solutions/inertia-modules'

export default defineConfig({
    plugins: [
        inertiaModules(),
        inertia(),
    ],
})
```

No changes are required in `app.ts`. The plugin discovers this package's
`resources/js/inertia.js` entry, lazy-loads its pages directly from `vendor/`,
keeps host pages working, and supports symlinked Composer path repositories.
{{MODULE_TITLE}} pages use the `{{MODULE_NAME}}::Page/Name` convention on the
server.

## Development

Install the backend and frontend dependencies:

```bash
composer install
npm install
```

Backend code belongs in `src/`. Inertia pages, components, and other frontend
resources belong in `resources/js/`.

## Releasing

The version in `package.json` is the single source of truth. Composer does not
need a version field: it derives the backend package version from Git tags.

Change the version in `package.json`, synchronize the lock file, commit both
files, and push to `main`:

```bash
npm install --package-lock-only --ignore-scripts
git add package.json package-lock.json
git commit -m "Release frontend and backend"
git push
```

For example, change `0.0.1` to `0.0.2` for a patch release, `0.1.0` for a minor
release, or `1.0.0` for a major release. Do not create the Git tag locally.

The version change on `main` starts the generated `Release` GitHub Actions
workflow. It then:

1. type-checks and builds the frontend SDK;
2. publishes the version to GitHub Packages if it is not already present;
3. creates the matching `vX.Y.Z` Composer tag; and
4. creates a GitHub Release with generated release notes.

Every stable version, including patch versions, receives a normal GitHub
Release. Versions with a SemVer suffix such as `-beta.1` or `-rc.1` receive a
GitHub Prerelease instead.

The pipeline-created tag is the Composer release, so for example npm `1.2.0`
and Git tag `v1.2.0` expose the same source revision as version `1.2.0`.
Configure the repository in Packagist or your private Composer registry once
so it observes new tags. Re-running a partially failed workflow safely
completes a missing npm publish, tag, or GitHub Release.

{{DEFAULT_DOCUMENTATION}}

{{EXAMPLE_DOCUMENTATION}}

## License

This module is open-source software licensed under the [MIT license](LICENSE.md).
