<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@sewaprith.org',
            'password' => \Illuminate\Support\Facades\Hash::make('password123'),
        ]);

        \App\Models\SiteContent::create([
            'key' => 'homepage',
            'hero' => [
                'tagline' => 'Small Acts, Big Impact.',
                'headline' => 'Empowering India\'s Slums.',
                'description' => 'We run direct diagnostics mobile clinics, sponsor higher education scholarships for slum girls, and serve nutritious food kitchens. 100% of your funds reach the beneficiaries.',
                'bannerImage' => 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80',
            ],
            'impact_stats' => [
                'livesImpacted' => 15200,
                'activeDrives' => 50,
                'transparency' => 100,
                'fundsDeployed' => 45,
            ],
            'trust_pillars' => [
                ['title' => '80G & 12A Certified', 'description' => 'All donations made to SewaPrith are eligible for a 50% tax deduction under Section 80G of the Indian Income Tax Act.'],
                ['title' => '0% Admin Fee Leak', 'description' => 'Our founders fund all administrative, office setup, website domain, and Vercel hosting charges out of their pockets.'],
                ['title' => 'Direct Ground Reports', 'description' => 'We believe in proof. We share geotagged photos, hospital diagnosis summaries, patient bills, and receipt vouchers.'],
            ],
            'social_media_feeds' => [],
            'announcement' => [
                'enabled' => false,
                'message' => 'Medical camp scheduled this Sunday at Lucknow slum.',
                'link' => '/campaigns',
                'type' => 'info',
            ],
        ]);
    }
}
