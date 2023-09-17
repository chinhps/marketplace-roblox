<?php

namespace App\Providers;

use App\Repository\Account\AccountInterface;
use App\Repository\Account\AccountRepository;
use App\Repository\History\PurchaseHistory\PurchaseHistoryInterface;
use App\Repository\History\PurchaseHistory\PurchaseHistoryRepository;
use App\Repository\History\RechargeHistory\RechargeHistoryInterface;
use App\Repository\History\RechargeHistory\RechargeHistoryRepository;
use App\Repository\History\ServiceHistory\ServiceHistoryInterface;
use App\Repository\History\ServiceHistory\ServiceHistoryRepository;
use App\Repository\History\WithdrawHistory\WithdrawHistoryInterface;
use App\Repository\History\WithdrawHistory\WithdrawHistoryRepository;
use App\Repository\RechargeList\RechargeListInterface;
use App\Repository\RechargeList\RechargeListRepository;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Service\ServiceDetail\ServiceDetailRepository;
use App\Repository\Service\ServiceGroup\ServiceGroupInterface;
use App\Repository\Service\ServiceGroup\ServiceGroupRepository;
use App\Repository\Service\ServiceInterface;
use App\Repository\Service\ServiceRepository;
use App\Repository\Shop\ShopInterface;
use App\Repository\Shop\ShopRepository;
use App\Repository\TopRecharge\TopRechargeInterface;
use App\Repository\TopRecharge\TopRechargeRepository;
use App\Repository\Transaction\TransactionInterface;
use App\Repository\Transaction\TransactionRepository;
use App\Repository\User\UserInterface;
use App\Repository\User\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(TransactionInterface::class, TransactionRepository::class);
        $this->app->bind(ShopInterface::class, ShopRepository::class);
        $this->app->bind(ServiceGroupInterface::class, ServiceGroupRepository::class);
        $this->app->bind(ServiceDetailInterface::class, ServiceDetailRepository::class);
        $this->app->bind(ServiceInterface::class, ServiceRepository::class);
        $this->app->bind(ServiceHistoryInterface::class, ServiceHistoryRepository::class);
        $this->app->bind(AccountInterface::class, AccountRepository::class);
        $this->app->bind(PurchaseHistoryInterface::class, PurchaseHistoryRepository::class);
        $this->app->bind(TopRechargeInterface::class, TopRechargeRepository::class);
        $this->app->bind(RechargeHistoryInterface::class, RechargeHistoryRepository::class);
        $this->app->bind(WithdrawHistoryInterface::class, WithdrawHistoryRepository::class);
        $this->app->bind(RechargeListInterface::class, RechargeListRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
