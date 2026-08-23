<?php

declare(strict_types=1);

namespace {{ORGANIZATION_NAME}}\{{MODULE_NAME}}\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use {{ORGANIZATION_NAME}}\{{MODULE_NAME}}\Models\Example;

final class ExampleController
{
    public function index(): Response
    {
        return Inertia::render('{{MODULE_NAME}}::Examples/Index', [
            'examples' => Example::query()
                ->latest()
                ->get()
                ->map(fn (Example $example): array => [
                    'id' => $example->getKey(),
                    'title' => $example->title,
                    'description' => $example->description,
                    'url' => route('{{MODULE_SLUG}}.examples.show', $example),
                ]),
        ]);
    }

    public function show(Example $example): Response
    {
        return Inertia::render('{{MODULE_NAME}}::Examples/Show', [
            'example' => [
                'id' => $example->getKey(),
                'title' => $example->title,
                'description' => $example->description,
            ],
            'indexUrl' => route('{{MODULE_SLUG}}.examples.index'),
        ]);
    }
}
