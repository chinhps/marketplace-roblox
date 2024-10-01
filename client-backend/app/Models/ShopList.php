<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ShopList extends Model
{
    use HasFactory;
    protected $table = "shop_list";

    public function shopdetails(): HasOne
    {
        return $this->hasOne(ShopDetail::class, "shop_id");
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'shop_id');
    }

    public function topRecharges(): HasMany
    {
        return $this->hasMany(TopRecharge::class, 'shop_id');
    }

    public function topRechargeVirtuals(): HasMany
    {
        return $this->hasMany(TopRechargeVirtual::class, 'shop_id');
    }
}
