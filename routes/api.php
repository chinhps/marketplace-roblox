<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Event\EventController;
use App\Http\Controllers\Histories\EventHistoryController;
use App\Http\Controllers\Histories\PurchaseHistoryController;
use App\Http\Controllers\Histories\RechargeHistoryController;
use App\Http\Controllers\Histories\ServiceHistoryController;
use App\Http\Controllers\Histories\WithdrawHistoryController;
use App\Http\Controllers\Plugin\PluginController;
use App\Http\Controllers\Service\ServiceController;
use App\Http\Controllers\Service\ServiceDetailController;
use App\Http\Controllers\Service\ServiceForAllController;
use App\Http\Controllers\Service\ServiceGamePassController;
use App\Http\Controllers\Service\ServiceGroupController;
use App\Http\Controllers\Service\ServiceOddsController;
use App\Http\Controllers\Shop\ShopController;
use App\Http\Controllers\Statistical\StatisticalController;
use App\Http\Controllers\TopRecharge\TopRechargeController;
use App\Http\Controllers\TopRecharge\TopRechargeVirtualController;
use App\Http\Controllers\Transactions\TransactionController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\LogoutController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Webhook\PushDiamondController;
use App\Http\Controllers\Webhook\WebhookDiamondController;
use App\Http\Controllers\Webhook\WebhookRechargeController;
use App\Http\Controllers\WithdrawLimit\WithdrawLimitController;
use App\Http\Controllers\WithdrawLimit\WithdrawTypeController;
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

# WEBHOOK
Route::prefix('webhook')->group(function () {
    Route::post('/recharge/callbackv2', [WebhookRechargeController::class, 'webhook']);
    Route::post('/withdraw/callback', [WebhookDiamondController::class, 'webhookDiamond']);
    Route::get('/push_diamond', [PushDiamondController::class, 'pushDiamond']);
});

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

    Route::prefix('statistical')->group(function () {
        Route::get('/service', [StatisticalController::class, 'service']);
        Route::get('/revenue', [StatisticalController::class, 'revenue']);
        Route::get('/charts', [StatisticalController::class, 'charts']);
        Route::get('/by-domain/{domain}', [StatisticalController::class, 'byDomain'])->middleware(['role:admin,koc']);
    });

    # navbar
    Route::get('/navbar', [UserController::class, 'navbar']);

    # Get infor current user
    Route::get('/user', [AuthController::class, 'getCurrentInfo']);

    Route::prefix('shop-list')->group(function () {
        Route::get('/all', [ShopController::class, 'all']);
    });

    Route::middleware(['role:admin'])->group(function () {
        Route::prefix('withdrawal-limits')->group(function () {
            Route::get('/', [WithdrawLimitController::class, 'list']);
            Route::get('/{id}', [WithdrawLimitController::class, 'getId']);
            Route::post('/upsert', [WithdrawLimitController::class, 'upsert']);
            Route::delete('/{id}', [WithdrawLimitController::class, 'delete']);
        });
        Route::prefix('withdraw-types')->group(function () {
            Route::get('/all', [WithdrawTypeController::class, 'all']);
        });
        Route::prefix('plugins')->group(function () {
            Route::get('/', [PluginController::class, 'list']);
            Route::get('/{id}', [PluginController::class, 'getId']);
            Route::post('/upsert', [PluginController::class, 'upsert']);
        });
        Route::prefix('shop-list')->group(function () {
            Route::get('/', [ShopController::class, 'list']);
            Route::get('/{id}', [ShopController::class, 'getId']);
            Route::post('/upsert', [ShopController::class, 'upsert']);
        });
        Route::prefix('services')->group(function () {
            Route::get('/', [ServiceController::class, 'list']);
            Route::get('/all-list', [ServiceController::class, 'listAll']);
            Route::get('/{id}', [ServiceController::class, 'getId']);
            Route::delete('/{id}', [ServiceController::class, 'delete']);
            Route::post('/update', [ServiceController::class, 'update']);
        });
        Route::prefix('services-detail-list')->group(function () {
            Route::get('/', [ServiceDetailController::class, 'list']);
            Route::delete('/{id}', [ServiceDetailController::class, 'delete']);
        });
        Route::prefix('services-group-list')->group(function () {
            Route::get('/', [ServiceGroupController::class, 'list']);
            Route::get('/{id}', [ServiceGroupController::class, 'getId']);
            Route::delete('/{id}', [ServiceGroupController::class, 'delete']);
            Route::post('/upsert', [ServiceGroupController::class, 'upsert']);
        });
        Route::prefix('game-pass')->group(function () {
            Route::get('/{id}', [ServiceGamePassController::class, 'getId']);
            Route::delete('/{id}', [ServiceGamePassController::class, 'delete']);
            Route::post('/upsert', [ServiceGamePassController::class, 'upsert']);
        });
        Route::prefix('services-odds-list')->group(function () {
            Route::get('/', [ServiceOddsController::class, 'list']);
            Route::get('/{id}', [ServiceOddsController::class, 'getId']);
            Route::delete('/{id}', [ServiceOddsController::class, 'delete']);
            Route::post('/upsert', [ServiceOddsController::class, 'upsert']);
        });
        Route::prefix('services-for-all')->group(function () {
            Route::post('/upsert', [ServiceForAllController::class, 'upsert']);
        });
        Route::prefix('admins')->group(function () {
            Route::get('/', [AdminController::class, 'list']);
            Route::get('/{id}', [AdminController::class, 'getId']);
            Route::delete('/{id}', [AdminController::class, 'delete']);
            Route::post('/upsert', [AdminController::class, 'upsert']);
        });
    });
    Route::middleware(['role:admin,support'])->group(function () {
        Route::prefix('transactions')->group(function () {
            Route::post('/', [TransactionController::class, 'createTransaction']);
            Route::get('/price', [TransactionController::class, 'priceList']);
            Route::get('/robux', [TransactionController::class, 'robuxList']);
            Route::get('/diamond', [TransactionController::class, 'diamondList']);
        });
        Route::prefix('users')->group(function () {
            Route::get('/', [UserController::class, 'list']);
            Route::get('/{id}', [UserController::class, 'getId']);
            Route::put('/{id}', [UserController::class, 'blockUser']);
        });
        Route::prefix('events')->group(function () {
            Route::get('/', [EventController::class, 'list']);
            Route::get('/{id}', [EventController::class, 'getId']);
            Route::post('/upsert', [EventController::class, 'upsert']);
        });

        Route::prefix('top-recharge')->group(function () {
            Route::get('/', [TopRechargeController::class, 'list']);
            Route::delete('/{id}', [TopRechargeController::class, 'delete']);
        });
        Route::prefix('top-recharge-virtual')->group(function () {
            Route::get('/', [TopRechargeVirtualController::class, 'list']);
            Route::get('/{id}', [TopRechargeVirtualController::class, 'getId']);
            Route::delete('/{id}', [TopRechargeVirtualController::class, 'delete']);
            Route::post('/upsert', [TopRechargeVirtualController::class, 'upsert']);
        });
    });
    Route::middleware(['role:admin,support,ctv'])->group(function () {
        Route::prefix('accounts')->group(function () {
            Route::get('/', [AccountController::class, 'list']);
            Route::get('/{id}', [AccountController::class, 'getId']);
            Route::delete('/{id}', [AccountController::class, 'delete']);
            Route::post('/upsert', [AccountController::class, 'upsertAccount']);
            Route::post('/create-random', [AccountController::class, 'upsertRandom']);
            Route::post('/create-box', [AccountController::class, 'upsertBox']);
        });
    });
    Route::middleware(['role:admin,support,koc,ctv'])->group(function () {
        Route::prefix('histories')->group(function () {

            Route::prefix('purchases')->group(function () {
                Route::get('/', [PurchaseHistoryController::class, 'list']);
                Route::put('/{id}', [PurchaseHistoryController::class, 'updateRefund'])
                    ->middleware(['role:admin,support']);
            });

            Route::middleware(['role:admin,support,koc'])->group(function () {
                Route::prefix('recharges')->group(function () {
                    Route::get('/', [RechargeHistoryController::class, 'list']);
                    Route::put('/{id}', [RechargeHistoryController::class, 'updateRefund'])
                        ->middleware(['role:admin,support']);
                });
                Route::prefix('services')->group(function () {
                    Route::get('/', [ServiceHistoryController::class, 'list']);
                });
                Route::middleware(['role:admin,support'])->group(function () {
                    Route::prefix('events')->group(function () {
                        Route::get('/', [EventHistoryController::class, 'list']);
                    });
                    Route::prefix('withdraw')->group(function () {
                        // Route::post('/update-all', [WithdrawHistoryController::class, 'updateStatusAll']);
                        Route::get('/', [WithdrawHistoryController::class, 'list']);
                        Route::post('/export-robux', [WithdrawHistoryController::class, 'exportRobux']);
                        Route::put('/{id}', [WithdrawHistoryController::class, 'updateStatus']);
                    });
                });
            });
        });
    });
});
