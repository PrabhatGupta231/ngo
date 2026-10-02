<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;

Route::get('/', [HomeController::class, 'index']);

// Additional pages
Route::get('/about', [PageController::class, 'about']);
Route::get('/campaigns', [PageController::class, 'campaigns']);
Route::get('/gallery', [PageController::class, 'gallery']);
Route::get('/updates', [PageController::class, 'updates']);
Route::get('/volunteer', [PageController::class, 'volunteer']);
Route::get('/contact', [PageController::class, 'contact']);
Route::get('/donate', [PageController::class, 'donate']);
