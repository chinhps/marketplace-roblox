<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopList extends Model
{
    use HasFactory;
    protected $table = "shop_list";

    public function shopdetails()
    {
        return $this->hasOne(ShopDetail::class, "shop_id", "id");
    }

    public function users()
    {
        return $this->hasMany(User::class, 'shop_id', 'id');
    }
}
