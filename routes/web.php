<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\KeywordController;
use App\Http\Controllers\MiscController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


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

Route::middleware(['auth'])->group(function () {
  Route::resource('keywords', KeywordController::class);
  Route::resource('users', UserController::class);
  Route::resource('departments', DepartmentController::class);
  Route::get('/dashboard', [MiscController::class, 'index'])->name('dashboard');
});


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';
