<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Service\ServiceController;
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
    Route::post('register', [AuthController::class, 'register']);
    # Logout
    Route::middleware(['decryptToken:sanctum'])->prefix('logout')->group(function () {
        # Logout current device
        Route::post('/',  [LogoutController::class, 'logout']);
        # Logout all device
        Route::post('/all',  [LogoutController::class, 'logoutAll']);
    });
});

# information website
Route::prefix('information')->group(function () {
    Route::get('/', []);
    Route::get('top-recharge', []);
});

# News
Route::prefix('news')->group(function () {
    Route::get('/', []);
    Route::get('/view/{slug}', []);
});

# Accounts
Route::prefix('accounts')->group(function () {
    Route::get('/detail/{id}', [AccountController::class, 'accountDetail']);
    Route::get('/recommends', [AccountController::class, 'recommends']);

    # Buy account
    Route::post('/buy_account', [AccountController::class, 'buyAccount'])->middleware('decryptToken:sanctum');
});

# View Service home
Route::prefix('services')->group(function () {
    Route::get('/', [ServiceController::class, 'serviceList']);
    Route::get('/view/{slug}', [ServiceController::class, 'serviceDetail']);
    Route::get('/detail-list/{slug}', [ServiceController::class, 'serviceDetailAccountList']);
    Route::get('/recomends/{slug}', []);
    Route::get('/histories/{slug}', []);

    # play game
    Route::post('/is_play_try/{slug}', [ServiceController::class, 'handlePlayTry']);
    Route::post('/is_play/{slug}', [ServiceController::class, 'handlePlay'])->middleware('decryptToken:sanctum');
});

# Plugin
Route::prefix('plugins')->group(function () {
    Route::get('/current', []);
    Route::post('/claim', [])->middleware('decryptToken:sanctum');
});

Route::middleware(['decryptToken:sanctum'])->group(function () {
    # Get infor current user
    Route::get('/user',  [AuthController::class, 'getCurrentInfo']);

    # Profile user
    Route::prefix('profile')->group(function () {

        # history profile
        Route::prefix('history')->group(function () {
            Route::get('purchases', [HistoryBuyController::class, 'list']);
            Route::get('recharge', [HistoryRechargeController::class, 'list']);
            Route::get('services', [ServiceController::class, 'list']);

            Route::get('withdraw', [PaydiamondController::class, 'list']);
            Route::get('rent', [RentController::class, 'list']);
        });

        # create any services
        Route::prefix('services')->group(function () {
            Route::post('withdraw-robox', [PaydiamondController::class, 'withdraw_robux']);
            Route::post('buy-robux', [PaydiamondController::class, 'buy_robux']);
            Route::post('rent', [RentController::class, 'buy']);
        });
    });
});
