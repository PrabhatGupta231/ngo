<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;

class PageController extends Controller
{
    public function about()
    {
        return view('pages.about');
    }

    public function campaigns()
    {
        if (class_exists(Campaign::class)) {
            $campaigns = Campaign::where('is_active', true)->get();
        } else {
            $campaigns = collect();
        }
        return view('pages.campaigns', compact('campaigns'));
    }

    public function gallery()
    {
        return view('pages.gallery');
    }

    public function updates()
    {
        return view('pages.updates');
    }

    public function volunteer()
    {
        return view('pages.volunteer');
    }

    public function contact()
    {
        return view('pages.contact');
    }

    public function donate()
    {
        return view('pages.donate');
    }
}
