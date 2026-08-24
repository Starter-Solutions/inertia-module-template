# Inertia Module Template

This repository is a template for self-contained Laravel modules powered by
[Inertia.js](https://inertiajs.com/). It provides a shared starting point for
shipping backend and frontend functionality in a single package and is intended
for applications that follow a modular architecture.

The template is not installed directly into an application. The included
`create-module` command generates a new module repository from the provided
module name. The generated module can then be developed and versioned
independently and installed as a Composer package in one or more Laravel
applications.

## Requirements

- PHP 8.3 or newer
- Composer
- Node.js and npm
- Laravel 12 or 13 in the consuming application
- An application with Inertia.js configured

## Creating a module

Run the executable directly and pass the desired module name:

```bash
php create-module -o starter-solutions customer-management
```

The `-o`/`--organization` option defines the Composer vendor, npm scope, and
root PHP namespace. If the option is omitted, the command asks for the
organization interactively:

```text
$ php create-module customer-management
Organization: starter-solutions
```

The generated repository is created under `output/<module-name>`. For example,
the command above writes the module to `output/customer-management`.

Without additional flags, the generated frontend contains a simple, styled
`resources/js/pages/Index.vue` starter page. It can be rendered from Laravel as
`CustomerManagement::Index`.

The generator also asks for the module license. Press Enter to use the default
MIT license, or choose Apache-2.0, GPL-3.0-only, or proprietary:

```text
License:
  1) MIT (default)
  2) Apache-2.0
  3) GPL-3.0-only
  4) proprietary
Selection [1]:
```

For non-interactive generation, pass one of the short license names:

```bash
php create-module -o starter-solutions --license=apache customer-management
```

Accepted values are `mit`, `apache`, `gpl`, and `proprietary`. The generated
package metadata uses the corresponding SPDX identifier.

The selection updates `LICENSE.md`, Composer metadata, npm metadata, and the
generated README consistently.

### Example scaffold

Pass `--example` to include a working integration example:

```bash
php create-module -o starter-solutions --example customer-management
```

The example adds an Eloquent model, migration, idempotent seeder, controller,
resource routes, and Vue pages for listing, viewing, creating, and editing records.
The generated module README contains
the commands required to publish the pages, migrate and seed the database, and
open the example in the consuming application.

The command uses the contents of `template/` as its source and performs the
complete initial setup automatically:

1. It copies the template into a new module repository.
2. It replaces the template placeholders with the organization and module name.
3. It applies the replacements to both file contents and file names.
4. It runs `composer install` to install the PHP dependencies.
5. It runs `npm install` to install the frontend dependencies.
6. It initializes a Git repository with `main` as its default branch.
7. It creates the first commit with the message `Initial commit`.

The resulting repository is ready for module development without manually
renaming template files, replacing namespaces, installing dependencies, or
initializing version control.

For the inputs `starter-solutions` and `customer-management`, the placeholders
resolve as follows:

| Placeholder | Value |
| --- | --- |
| `{{MODULE_NAME}}` | `CustomerManagement` |
| `{{MODULE_SLUG}}` | `customer-management` |
| `{{MODULE_SNAKE}}` | `customer_management` |
| `{{MODULE_TITLE}}` | `Customer Management` |
| `{{ORGANIZATION_NAME}}` | `StarterSolutions` |
| `{{ORGANIZATION_SLUG}}` | `starter-solutions` |
| `{{ORGANIZATION_TITLE}}` | `Starter Solutions` |

## Purpose

A module keeps all parts of a feature or domain in one place. This may include:

- Laravel routes, controllers, actions, and services
- Models, policies, form requests, and other backend logic
- Inertia pages, layouts, and reusable frontend components
- JavaScript or TypeScript code and styles
- Configuration, translations, views, and migrations
- Backend and frontend tests

Related functionality is therefore versioned together. The Laravel application
acts as the host, while the module provides its backend logic and corresponding
Inertia interface as a single unit. Generated modules also expose a headless npm
SDK containing TypeScript types and UI-free, Inertia-native Vue composables.
The SDK does not introduce a separate JSON client. The npm version and Composer
Git tag are created from the same release revision.

## Installing a module in a Laravel application

During local development, the generated module can be installed through a
Composer path repository. Add the repository to the Laravel application's
`composer.json`:

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../customer-management",
            "options": {
                "symlink": true
            }
        }
    ]
}
```

Then install the package name defined in the generated module:

```bash
composer require <vendor>/<module-name>:@dev
```

Laravel automatically loads the service provider through package discovery as
long as it is registered under `extra.laravel.providers` in the module's
`composer.json`.

Generated modules use their module slug as the default route prefix, resulting
in URLs such as `/customer-management/examples`. The prefix is controlled by
`route_prefix` in the module configuration. After publishing the configuration,
it replaces the module slug completely, resulting in URLs such as
`/custom-config-slug/examples`. It can also be set to an empty string without
modifying package routes.

The module pages remain in the Composer package. Install the shared Vite plugin
in the host application:

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

No resolver changes are required in `app.ts`. The plugin automatically hooks
into `createInertiaApp()`, retains the host's standard `pages` and `Pages`
directories, discovers every module entry under `vendor/`, lazy-loads package
pages, and handles symlinked Composer path repositories.

When the host needs the module's public headless API, it additionally installs
the generated module's scoped package from GitHub Packages. Each generated
repository contains a release workflow that publishes the version declared in
`package.json` whenever that file changes on `main`, then creates the matching
`vX.Y.Z` Composer tag. Every published version receives a GitHub Release with
generated notes; SemVer prerelease versions are published with the npm `next`
dist-tag and marked as GitHub Prereleases.

## Developing a module

The service provider is the module's entry point. Use `register()` for container
bindings and configuration. Use `boot()` to load resources such as routes,
views, migrations, and publishable assets.

The generated frontend uses Vue 3. Each Composer package exposes a small
JavaScript module with a `resolveModulePage()` function, while the shared
`@starter-solutions/inertia-modules` Vite plugin hooks those resolvers into the
host build. A Vue plugin is not required because Inertia resolves a page before
the Vue application is mounted. Its separately published npm SDK is intended
for stable, headless imports by the host and does not contain the module pages.

## Scope

This repository is a template, not a central package that collects multiple
modules. Each module created from the template has its own repository, package
name, and release lifecycle.

## License

Inertia Modules is open-source software licensed under the [MIT license](LICENSE.md).
