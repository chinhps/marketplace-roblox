<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    public function shop()
    {
        return $this->belongsTo(ShopList::class, 'shop_id');
    }

    public function rechargeHistories(): HasMany
    {
        return $this->hasMany(RechargeHistory::class, 'user_id');
    }

    public function withdrawHistories(): HasMany
    {
        return $this->hasMany(WithdrawHistory::class, 'user_id');
    }

    public function purchaseHistories(): HasMany
    {
        return $this->hasMany(PurchaseHistory::class, 'user_id');
    }

    public function serviceHistories(): HasMany
    {
        return $this->hasMany(ServiceHistory::class, 'user_id');
    }

    public function eventHistories(): HasMany
    {
        return $this->hasMany(EventHistory::class, 'user_id');
    }

    public function transactionsPrice(): HasMany
    {
        return $this->hasMany(TransactionPrice::class, 'user_id');
    }

    public function transactionsDiamond(): HasMany
    {
        return $this->hasMany(TransactionDiamond::class, 'user_id');
    }

    public function transactionsRobux(): HasMany
    {
        return $this->hasMany(TransactionRobux::class, 'user_id');
    }
}
