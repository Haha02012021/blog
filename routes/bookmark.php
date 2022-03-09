<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookmarkController;

Route::post("/", [BookmarkController::class, 'store'])->name('store');

Route::post("/destroy/{article}", [BookmarkController::class, 'destroy'])->name('destroy');

Route::get("/show/{article}", [BookmarkController::class, 'show'])->name('show');

Route::middleware('auth')->get("/index", [BookmarkController::class, 'index'])->name('index');