<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\TestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route("articles.index");
})->middleware('cors');

Route::get('/welcome', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/image/upload', [ImageController::class, 'upload'])->name('image.upload');

Route::get('/image/{type}/load', [ImageController::class, 'loadMany'])->name('image.load-many');

Route::get('/test', [TestController::class, 'get'])->name('tests.get');

Route::post('/test', [TestController::class, 'post'])->name('tests.post');

require __DIR__.'/auth.php';
