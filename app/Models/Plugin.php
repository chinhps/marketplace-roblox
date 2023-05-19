<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plugin extends Model
{
    use HasFactory;
    protected $table = "plugins";

    public function shop_list()
    {
        return $this->belongsToMany(ShopList::class, 'plugin_except_shop', 'plugin_id', 'shop_id');
    }
}
