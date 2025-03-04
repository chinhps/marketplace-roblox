<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RechargeHistory extends Model
{
    use HasFactory;
    protected $table = "recharge_histories";
    protected $guarded = [];

    public function recharge(): BelongsTo
    {
        return $this->belongsTo(RechargeList::class, 'recharge_id');
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(ShopList::class, 'shop_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
