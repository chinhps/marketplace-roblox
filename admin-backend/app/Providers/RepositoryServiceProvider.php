<?php

namespace App\Providers;

use App\Repository\Account\AccountInterface;
use App\Repository\Account\AccountRepository;
use App\Repository\Admin\AdminInterface;
use App\Repository\Admin\AdminRepository;
use App\Repository\Event\EventInterface;
use App\Repository\Event\EventRepository;
use App\Repository\Game\GameCurrency\GameCurrencyInterface;
use App\Repository\Game\GameCurrency\GameCurrencyRepository;
use App\Repository\Game\GameList\GameListInterface;
use App\Repository\Game\GameList\GameListRepository;
use App\Repository\Histories\EventHistory\EventHistoryInterface;
use App\Repository\Histories\EventHistory\EventHistoryRepository;
use App\Repository\Histories\PurchaseHistory\PurchaseHistoryInterface;
use App\Repository\Histories\PurchaseHistory\PurchaseHistoryRepository;
use App\Repository\Histories\RechargeHistory\RechargeHistoryInterface;
use App\Repository\Histories\RechargeHistory\RechargeHistoryRepository;
use App\Repository\Histories\ServiceHistory\ServiceHistoryInterface;
use App\Repository\Histories\ServiceHistory\ServiceHistoryRepository;
use App\Repository\Histories\WithdrawHistory\WithdrawHistoryInterface;
use App\Repository\Histories\WithdrawHistory\WithdrawHistoryRepository;
use App\Repository\Plugin\PluginInterface;
use App\Repository\Plugin\PluginRepository;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Service\ServiceDetail\ServiceDetailRepository;
use App\Repository\Service\ServiceGift\ServiceGiftInterface;
use App\Repository\Service\ServiceGift\ServiceGiftRepository;
use App\Repository\Service\ServiceGroup\ServiceGroupInterface;
use App\Repository\Service\ServiceGroup\ServiceGroupRepository;
use App\Repository\Service\ServiceImage\ServiceImageInterface;
use App\Repository\Service\ServiceImage\ServiceImageRepository;
use App\Repository\Service\ServiceInterface;
use App\Repository\Service\ServiceOdds\ServiceOddsInterface;
use App\Repository\Service\ServiceOdds\ServiceOddsRepository;
use App\Repository\Service\ServiceRepository;
use App\Repository\Shop\ShopInterface;
use App\Repository\Shop\ShopRepository;
use App\Repository\TopRecharge\TopRechargeInterface;
use App\Repository\TopRecharge\TopRechargeRepository;
use App\Repository\TopRecharge\TopRechargeVirtual\TopRechargeVirtualInterface;
use App\Repository\TopRecharge\TopRechargeVirtual\TopRechargeVirtualRepository;
use App\Repository\Transaction\TransactionInterface;
use App\Repository\Transaction\TransactionRepository;
use App\Repository\User\UserInterface;
use App\Repository\User\UserRepository;
use App\Repository\WithdrawLimit\WithdrawLimitInterface;
use App\Repository\WithdrawLimit\WithdrawLimitRepository;
use App\Repository\WithdrawPartner\WithdrawPartnerInterface;
use App\Repository\WithdrawPartner\WithdrawPartnerRepository;
use App\Repository\WithdrawType\WithdrawTypeInterface;
use App\Repository\WithdrawType\WithdrawTypeRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ShopInterface::class, ShopRepository::class);
        $this->app->bind(ServiceInterface::class, ServiceRepository::class);
        $this->app->bind(GameCurrencyInterface::class, GameCurrencyRepository::class);
        $this->app->bind(GameListInterface::class, GameListRepository::class);
        $this->app->bind(ServiceDetailInterface::class, ServiceDetailRepository::class);
        $this->app->bind(ServiceGroupInterface::class, ServiceGroupRepository::class);
        $this->app->bind(ServiceOddsInterface::class, ServiceOddsRepository::class);
        $this->app->bind(ServiceImageInterface::class, ServiceImageRepository::class);
        $this->app->bind(ServiceGiftInterface::class, ServiceGiftRepository::class);
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(AdminInterface::class, AdminRepository::class);
        $this->app->bind(PurchaseHistoryInterface::class, PurchaseHistoryRepository::class);
        $this->app->bind(RechargeHistoryInterface::class, RechargeHistoryRepository::class);
        $this->app->bind(WithdrawHistoryInterface::class, WithdrawHistoryRepository::class);
        $this->app->bind(ServiceHistoryInterface::class, ServiceHistoryRepository::class);
        $this->app->bind(EventHistoryInterface::class, EventHistoryRepository::class);
        $this->app->bind(TransactionInterface::class, TransactionRepository::class);
        $this->app->bind(EventInterface::class, EventRepository::class);
        $this->app->bind(TopRechargeInterface::class, TopRechargeRepository::class);
        $this->app->bind(TopRechargeVirtualInterface::class, TopRechargeVirtualRepository::class);
        $this->app->bind(AccountInterface::class, AccountRepository::class);
        $this->app->bind(PluginInterface::class, PluginRepository::class);
        $this->app->bind(WithdrawLimitInterface::class, WithdrawLimitRepository::class);
        $this->app->bind(WithdrawTypeInterface::class, WithdrawTypeRepository::class);
        $this->app->bind(WithdrawPartnerInterface::class, WithdrawPartnerRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
