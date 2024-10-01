<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'id',
        'name',
        'username',
        'password',
        'shop_id',
        'provider_id',
        'price_temporary',
        'diamond_temporary',
        'robux_temporary',
        'block',
        'active',
        'login_type'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function  services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'service_turns', 'user_id', 'service_id');
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(ShopList::class, 'shop_id', 'id');
    }

    public function admin(): HasOne
    {
        return $this->hasOne(Admin::class, 'user_id');
    }

    public function withdrawalLimit(): HasOne
    {
        return $this->hasOne(WithdrawalLimit::class, 'user_id');
    }
}
