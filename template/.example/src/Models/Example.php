<?php

declare(strict_types=1);

namespace {{ORGANIZATION_NAME}}\{{MODULE_NAME}}\Models;

use Illuminate\Database\Eloquent\Model;

final class Example extends Model
{
    protected $table = '{{MODULE_SNAKE}}_examples';

    protected $fillable = [
        'title',
        'description',
    ];
}
