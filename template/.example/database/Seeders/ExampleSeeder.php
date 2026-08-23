<?php

declare(strict_types=1);

namespace {{ORGANIZATION_NAME}}\{{MODULE_NAME}}\Database\Seeders;

use Illuminate\Database\Seeder;
use {{ORGANIZATION_NAME}}\{{MODULE_NAME}}\Models\Example;

final class ExampleSeeder extends Seeder
{
    public static function run(): void
    {
        foreach (range(1, 3) as $number) {
            Example::query()->updateOrCreate(
                ['title' => "Example {$number}"],
                ['description' => "This record was created by the {{MODULE_TITLE}} example seeder."],
            );
        }
    }
}
