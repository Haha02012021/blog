<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoteController;

Route::post('/up/{article}', [VoteController::class, 'up'])->name('up');

Route::post('/down/{article}', [VoteController::class, 'down'])->name('down');

Route::get('/{article}', [VoteController::class, 'votes'])->name('votes');
