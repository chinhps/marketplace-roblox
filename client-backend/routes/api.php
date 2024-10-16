<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Event\EventController;
use App\Http\Controllers\Histories\PurchaseHistoryController;
use App\Http\Controllers\Histories\RechargeHistoryController;
use App\Http\Controllers\Histories\ServiceHistoryController;
use App\Http\Controllers\Histories\WithdrawHistoryController;
use App\Http\Controllers\Plugin\PluginController;
use App\Http\Controllers\Recharge\RechargeController;
use App\Http\Controllers\Service\ServiceController;
use App\Http\Controllers\Service\UnitController;
use App\Http\Controllers\Shop\ShopController;
use App\Http\Controllers\TopRecharge\TopRechargeController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\LoginWith\FacebookLoginController;
use App\Http\Controllers\User\LogoutController;
use App\Http\Controllers\Withdraw\GamePassController;
use App\Http\Controllers\Withdraw\WithdrawDiamondController;
use App\Http\Controllers\Withdraw\WithdrawRobuxController;
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

# AUTH
Route::prefix('auth')->group(function () {

    Route::prefix('login-with')->group(function () {
        Route::post('get-sign-in-url', [AuthController::class, 'getLinkLoginSocial']);
        Route::post('verified-token-facebook', [FacebookLoginController::class, 'checkLogin']);
    });

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
    Route::get('/', [ShopController::class, 'infomationShop']);
    Route::get('top-recharge', [TopRechargeController::class, 'getTopRechargeList']);
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
    Route::get('/unit/{slug}', [UnitController::class, 'UnitView']);
    Route::get('/detail-list/{slug}', [ServiceController::class, 'serviceDetailAccountList']);
    Route::get('/recommends/{slug}', [ServiceController::class, 'recommendsService']);
    // Route::get('/histories/{slug}', []);

    # play game
    Route::post('/is_play_try/{slug}', [ServiceController::class, 'handlePlayTry']);
    Route::post('/is_play/{slug}', [ServiceController::class, 'handlePlay'])->middleware('decryptToken:sanctum');
    # game pass
    Route::post('/game_pass/{slug}', [GamePassController::class, 'buyGamePass'])->middleware('decryptToken:sanctum');
});

# Plugin
Route::prefix('plugins')->group(function () {
    Route::get('/all', [PluginController::class, 'all']);
});

# Event
Route::prefix('events')->group(function () {
    Route::get('/get_one_ghost', [EventController::class, 'getEventLast']);
    Route::get('/get_one', [EventController::class, 'getEventLast'])->middleware('decryptToken:sanctum');
    Route::post('/claim', [EventController::class, 'claim'])->middleware('decryptToken:sanctum');
});

Route::middleware(['decryptToken:sanctum'])->group(function () {
    # Get infor current user
    Route::get('/user',  [AuthController::class, 'getCurrentInfo']);

    # Profile user
    Route::prefix('profile')->group(function () {

        # recharge 
        Route::post('recharge', [RechargeController::class, 'recharge']);

        # history profile
        Route::prefix('history')->group(function () {
            Route::get('purchases', [PurchaseHistoryController::class, 'list']);
            Route::get('recharge', [RechargeHistoryController::class, 'list']);
            Route::get('services', [ServiceHistoryController::class, 'list']);
            Route::get('withdraw', [WithdrawHistoryController::class, 'list']);
        });

        # withdraw profile
        Route::prefix('withdraw')->group(function () {
            Route::post('robux', [WithdrawRobuxController::class, 'robux']);
            Route::post('diamond', [WithdrawDiamondController::class, 'diamond']);
            Route::post('buy_robux', [WithdrawRobuxController::class, 'buy_robux']);
        });

        # create any services
        Route::prefix('services')->group(function () {
            Route::post('withdraw-robox', []);
            Route::post('buy-robux', []);
            Route::post('rent', []);
        });
    });
});
