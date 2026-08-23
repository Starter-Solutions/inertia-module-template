<?php

declare(strict_types=1);

namespace {{ORGANIZATION_NAME}}\{{MODULE_NAME}};

use Illuminate\Support\ServiceProvider;

final class {{MODULE_NAME}}ServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(
            dirname(__DIR__).'/config/{{MODULE_SLUG}}.php',
            '{{MODULE_SLUG}}',
        );
    }

    public function boot(): void
    {
        $routes = dirname(__DIR__).'/routes/web.php';
        $migrations = dirname(__DIR__).'/database/migrations';

        if (is_file($routes)) {
            $this->loadRoutesFrom($routes);
        }

        if (is_dir($migrations)) {
            $this->loadMigrationsFrom($migrations);
        }

        $this->publishes([
            dirname(__DIR__).'/config/{{MODULE_SLUG}}.php' => config_path('{{MODULE_SLUG}}.php'),
        ], '{{MODULE_SLUG}}-config');
    }
}
