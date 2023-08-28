<?php

namespace App\Providers;

use App\Repository\Game\GameCurrency\GameCurrencyInterface;
use App\Repository\Game\GameCurrency\GameCurrencyRepository;
use App\Repository\Game\GameList\GameListInterface;
use App\Repository\Game\GameList\GameListRepository;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Service\ServiceDetail\ServiceDetailRepository;
use App\Repository\Service\ServiceGroup\ServiceGroupInterface;
use App\Repository\Service\ServiceGroup\ServiceGroupRepository;
use App\Repository\Service\ServiceInterface;
use App\Repository\Service\ServiceOdds\ServiceOddsInterface;
use App\Repository\Service\ServiceOdds\ServiceOddsRepository;
use App\Repository\Service\ServiceRepository;
use App\Repository\Shop\ShopInterface;
use App\Repository\Shop\ShopRepository;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
