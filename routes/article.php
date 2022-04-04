<?php

use App\Http\Controllers\Article\ArticleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/index', [ArticleController::class, 'index'])->name('index');

Route::get('/show/{article}', [ArticleController::class, 'show'])->name('show');

Route::middleware('auth')->group(function() {
    Route::get('/create', [ArticleController::class, 'create'])->name('create');
    Route::post('/store', [ArticleController::class, 'store'])->name('store');
    Route::get('/edit/{article}', [ArticleController::class, 'edit'])->name('edit');
    Route::post('/update/{article}', [ArticleController::class, 'update'])->name('update');
    Route::delete('/destroy/{article}', [ArticleController::class, 'destroy'])->name('destroy');
});


