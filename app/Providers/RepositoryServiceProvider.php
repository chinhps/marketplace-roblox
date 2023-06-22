<?php

namespace App\Providers;

use App\Repository\Shop\ShopInterface;
use App\Repository\Shop\ShopRepository;
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

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
