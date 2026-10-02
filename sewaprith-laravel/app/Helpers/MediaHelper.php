<?php

namespace App\Helpers;

class MediaHelper
{
    public static function parseUrl($url)
    {
        if (str_contains($url, 'youtube.com') || str_contains($url, 'youtu.be')) {
            preg_match('/(?:v=|youtu\.be\/|youtube\.com\/shorts\/)([^&]+)/', $url, $matches);
            $id = $matches[1] ?? null;
            return $id ? "https://www.youtube.com/embed/{$id}" : null;
        }

        if (str_contains($url, 'instagram.com')) {
            preg_match('/instagram\.com\/(?:p|reel)\/([^\/]+)/', $url, $matches);
            $id = $matches[1] ?? null;
            return $id ? "https://www.instagram.com/p/{$id}/embed" : null;
        }

        if (str_contains($url, 'facebook.com')) {
            return "https://www.facebook.com/plugins/video.php?href=" . urlencode($url);
        }

        return null;
    }
}
