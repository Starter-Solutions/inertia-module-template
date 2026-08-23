<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use {{ORGANIZATION_NAME}}\{{MODULE_NAME}}\Http\Controllers\ExampleController;

$routePrefix = trim(
    (string) config('{{MODULE_SLUG}}.route_prefix', '{{MODULE_SLUG}}'),
    '/',
);

Route::middleware('web')
    ->prefix($routePrefix)
    ->name('{{MODULE_SLUG}}.')
    ->group(function (): void {
        Route::resource('examples', ExampleController::class)
            ->only(['index', 'create', 'store', 'show', 'edit', 'update']);
    });
