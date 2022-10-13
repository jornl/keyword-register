<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\KeywordController;
use App\Http\Controllers\MiscController;
use App\Http\Controllers\UserController;
use App\Models\Keyword;
use Illuminate\Foundation\Application;
use Illuminate\Http\Client\Request;
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

Route::get('/', [KeywordController::class, 'index'])->name("home");

Route::resource('keywords', KeywordController::class)->middleware(['auth']);
Route::resource('users', UserController::class)->middleware(['auth']);
Route::resource('departments', DepartmentController::class)->middleware(['auth']);

Route::get('/dashboard', [MiscController::class, 'index'])->middleware(['auth'])->name('dashboard');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';
