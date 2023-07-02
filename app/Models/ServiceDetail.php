<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ServiceDetail extends Model
{
    use HasFactory;
    protected $table = "service_details";

    public function shop_list()
    {
        return $this->belongsToMany(ShopList::class, 'service_details_except_shop', 'service_detail_id', 'shop_id');
    }

    public function serviceGroup(): HasOne
    {
        return $this->hasOne(ServiceGroup::class, 'id', 'service_group_id');
    }

    public function service(): HasOne
    {
        return $this->hasOne(Service::class, 'id', 'service_id');
    }

    public function serviceImage(): HasOne
    {
        return $this->hasOne(ServiceImage::class, 'id', 'service_image_id');
    }

    public function serviceOdds(): HasOne
    {
        return $this->hasOne(ServiceOdds::class, 'id', 'service_odds_id');
    }
}
