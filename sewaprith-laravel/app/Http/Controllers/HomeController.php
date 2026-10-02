<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteContent;
use App\Models\Campaign;

class HomeController extends Controller
{
    public function index()
    {
        $content = SiteContent::where('key', 'homepage')->first();
        $campaigns = Campaign::where('is_active', true)->get();

        return view('home', compact('content', 'campaigns'));
    }
}
