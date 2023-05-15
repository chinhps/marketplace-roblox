<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceDetail extends Model
{
    use HasFactory;
    protected $table = "service_details";

    public function shop_list()
    {
        return $this->belongsToMany(ShopList::class, 'service_details_except_shop', 'service_detail_id', 'shop_id');
    }
}
