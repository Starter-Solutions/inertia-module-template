<?php

declare(strict_types=1);

namespace {{ORGANIZATION_NAME}}\{{MODULE_NAME}}\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            'createUrl' => route('{{MODULE_SLUG}}.examples.create'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('{{MODULE_NAME}}::Examples/Create', [
            'indexUrl' => route('{{MODULE_SLUG}}.examples.index'),
            'storeUrl' => route('{{MODULE_SLUG}}.examples.store'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $example = Example::query()->create($this->validated($request));

        return redirect()
            ->route('{{MODULE_SLUG}}.examples.show', $example)
            ->with('success', 'Example created.');
    }

    public function show(Example $example): Response
    {
        return Inertia::render('{{MODULE_NAME}}::Examples/Show', [
            'example' => [
                'id' => $example->getKey(),
                'title' => $example->title,
                'description' => $example->description,
            ],
            'editUrl' => route('{{MODULE_SLUG}}.examples.edit', $example),
            'indexUrl' => route('{{MODULE_SLUG}}.examples.index'),
        ]);
    }

    public function edit(Example $example): Response
    {
        return Inertia::render('{{MODULE_NAME}}::Examples/Edit', [
            'example' => [
                'id' => $example->getKey(),
                'title' => $example->title,
                'description' => $example->description,
            ],
            'showUrl' => route('{{MODULE_SLUG}}.examples.show', $example),
            'updateUrl' => route('{{MODULE_SLUG}}.examples.update', $example),
        ]);
    }

    public function update(Request $request, Example $example): RedirectResponse
    {
        $example->update($this->validated($request));

        return redirect()
            ->route('{{MODULE_SLUG}}.examples.show', $example)
            ->with('success', 'Example updated.');
    }

    /** @return array{title: string, description: string|null} */
    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);
    }
}
