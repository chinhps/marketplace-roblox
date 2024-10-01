<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseHistory extends Model
{
    use HasFactory;
    protected $table = "purchase_histories";
    protected $fillable = [
        "refund"
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(AccountList::class, 'account_id');
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(ShopList::class, 'shop_id');
    }
}
