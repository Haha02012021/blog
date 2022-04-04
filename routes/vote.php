<?php

use App\Http\Controllers\Article\VoteController;
use App\Http\Controllers\Comment\VoteController as CommentVoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/up/articles/{article}', [VoteController::class, 'up'])->name('articles.up');

Route::post('/down/articles/{article}', [VoteController::class, 'down'])->name('articles.down');

Route::get('/articles/{article}', [VoteController::class, 'votes'])->name('articles.votes');

Route::post('/up/comments/{comment}', [CommentVoteController::class, 'up'])->name('comments.up');

Route::post('/down/comments/{comment}', [CommentVoteController::class, 'down'])->name('comments.down');

Route::get('/comments/{comment}', [CommentVoteController::class, 'votes'])->name('comments.votes');
