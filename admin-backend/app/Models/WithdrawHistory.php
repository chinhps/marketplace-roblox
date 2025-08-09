<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WithdrawHistory extends Model
{
    use HasFactory;
    protected $table = "withdraw_histories";
    protected $fillable = [
        "status",
        "cost"
    ];

    public function shop(): BelongsTo
    {
        return $this->belongsTo(ShopList::class, 'shop_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function withdrawType(): BelongsTo
    {
        return $this->belongsTo(WithdrawType::class, 'withdraw_type_id');
    }

    public function withdrawTypeKey(): BelongsTo
    {
        return $this->belongsTo(WithdrawType::class, 'withdraw_type', 'type_key');
    }
}
