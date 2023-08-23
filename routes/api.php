<?php

use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\LogoutController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    # Logout
    Route::middleware(['decryptToken:sanctum'])->prefix('logout')->group(function () {
        # Logout current device
        Route::post('/',  [LogoutController::class, 'logout']);
        # Logout all device
        Route::post('/all',  [LogoutController::class, 'logoutAll']);
    });
});

Route::middleware(['decryptToken:sanctum'])->group(function () {
    # Get infor current user
    Route::get('/user',  [AuthController::class, 'getCurrentInfo']);
});
