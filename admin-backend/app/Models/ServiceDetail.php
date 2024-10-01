<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ServiceDetail extends Model
{
    use HasFactory;
    protected $table = "service_details";
    protected $guarded = [];

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

    public function serviceImage(): BelongsTo
    {
        return $this->belongsTo(ServiceImage::class, 'service_image_id');
    }

    public function serviceOdds(): BelongsTo
    {
        return $this->belongsTo(ServiceOdds::class, 'service_odds_id');
    }
}
