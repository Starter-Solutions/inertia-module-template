<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::name('{{MODULE_SLUG}}.')
    ->middleware(config('{{MODULE_SLUG}}.middleware', 'web'))
    ->prefix(trim((string) config('{{MODULE_SLUG}}.route_prefix', '{{MODULE_SLUG}}'), '/'))
    ->group(function (): void {
        Route::get('/', fn (): Response => Inertia::render('{{MODULE_NAME}}::Index'))
            ->name('index');
    });
