<?php

use App\Http\Controllers\Comment\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function() {
    Route::post('/store', [CommentController::class, 'store'])->name('store');
    Route::get('/create', [CommentController::class, 'create'])->name('create');
    Route::get('/show/{article}', [CommentController::class, 'show'])->name('show');
    Route::get('/edit', [CommentController::class, 'edit'])->name('edit');
    Route::post('/reply', [CommentController::class, 'reply'])->name('reply');
    Route::delete('/destroy/{comment}', [CommentController::class, 'destroy'])->name('destroy');
});