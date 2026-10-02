<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteContent extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'hero' => 'array',
            'impact_stats' => 'array',
            'trust_pillars' => 'array',
            'social_media_feeds' => 'array',
            'announcement' => 'array',
        ];
    }
}
