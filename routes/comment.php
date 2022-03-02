<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;

Route::middleware('auth')->group(function() {
    Route::post('/store', [CommentController::class, 'store'])->name('store');
    Route::get('/create', [CommentController::class, 'create'])->name('create');
});