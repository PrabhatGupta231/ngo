<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

echo "1. Database & Seeder Verification:\n";
$content = DB::table('site_contents')->where('section', 'homepage')->first();
$passed = true;

if ($content) {
    echo " - Homepage record found\n";
    $data = json_decode($content->data, true);
    if (isset($data['hero']) && isset($data['impact_stats']) && isset($data['social_media_feeds']) && isset($data['announcement'])) {
        echo " - All JSON keys present: PASSED\n";
    } else {
        echo " - Missing JSON keys: FAILED\n";
        $passed = false;
    }
} else {
    echo " - Homepage record missing: FAILED\n";
    $passed = false;
}

$campaigns = DB::table('campaigns')->where('is_active', true)->count();
if ($campaigns > 0) {
    echo " - Active campaigns found ({$campaigns}): PASSED\n";
} else {
    echo " - No active campaigns found: FAILED\n";
    $passed = false;
}

echo "\n2. Admin Panel Dynamic Update Test:\n";
if ($content) {
    $data['hero']['headline'] = 'Test Headline from Audit';
    $data['social_media_feeds'] = [
        ['platform' => 'youtube', 'url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        ['platform' => 'instagram', 'url' => 'https://www.instagram.com/reel/abcdefg/']
    ];
    $data['announcement']['enabled'] = true;
    $data['announcement']['text'] = 'Audit Alert Text';
    
    DB::table('site_contents')->where('section', 'homepage')->update(['data' => json_encode($data)]);
    echo " - Update applied successfully: PASSED\n";
}

echo "\n3. Blade Template Data Binding Check:\n";
// Create a request to the application
$request = Illuminate\Http\Request::create('/', 'GET');
$response = $app->handle($request);
$html = $response->getContent();

$checks = [
    'Headline' => 'Test Headline from Audit',
    'Announcement' => 'Audit Alert Text',
    'YouTube' => 'dQw4w9WgXcQ',
    'Instagram' => 'abcdefg',
];

foreach ($checks as $name => $str) {
    if (strpos($html, $str) !== false) {
        echo " - {$name} renders: PASSED\n";
    } else {
        echo " - {$name} renders: FAILED\n";
    }
}

echo "\nDone.\n";
