<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ServiceDetail extends Model
{
    use HasFactory;
    protected $table = "service_details";

    public function shop_list(): BelongsToMany
    {
        return $this->belongsToMany(ShopList::class, 'service_details_except_shop', 'service_detail_id', 'shop_id');
    }

    public function serviceGroup(): BelongsTo
    {
        return $this->belongsTo(ServiceGroup::class, 'service_group_id');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function serviceImage(): HasOne
    {
        return $this->hasOne(ServiceImage::class, 'id', 'service_image_id');
    }

    public function serviceOdds(): HasOne
    {
        return $this->hasOne(ServiceOdds::class, 'id', 'service_odds_id');
    }

    public function serviceCounter(): HasOne
    {
        return $this->hasOne(ServiceCounter::class, "service_id");
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(AccountList::class, 'service_id');
    }
}
