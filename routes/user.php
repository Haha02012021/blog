<?php

use App\Http\Controllers\Auth\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get("/api/{user}", [UserController::class, 'get'])->name('info');

Route::get("/{user}", [UserController::class, 'show_articles'])->name('show');

Route::get("/{user}/bookmarks", [UserController::class, 'show_bookmarks'])->name('show.bookmarks');

Route::get("/{user}/article-images", [UserController::class, 'get_article_images'])->name('article-images');