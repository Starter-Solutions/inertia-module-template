# {{MODULE_TITLE}}

`{{ORGANIZATION_SLUG}}/{{MODULE_SLUG}}` is a self-contained Laravel and Inertia.js
module. It keeps the backend logic and its corresponding frontend resources in
a single versioned package.

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

{{DEFAULT_DOCUMENTATION}}

{{EXAMPLE_DOCUMENTATION}}

## License

This module is open-source software licensed under the [MIT license](LICENSE.md).
