<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Admin;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('admin', function (Admin $admin) {
            return $admin->admin_type === "ADMIN";
        });

        Gate::define('koc', function (Admin $admin) {
            return $admin->admin_type === "KOC";
        });

        Gate::define('ctv', function (Admin $admin) {
            return $admin->admin_type === "CTV";
        });

        Gate::define('support', function (Admin $admin) {
            return $admin->admin_type === "SUPPORT";
        });
    }
}
