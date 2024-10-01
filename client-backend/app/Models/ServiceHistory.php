<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceHistory extends Model
{
    use HasFactory;
    protected $table = "service_histories";

    protected $fillable = [
        "id",
        "user_id",
        "service_id",
        "shop_id",
        "quantity",
        "detail"
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(ShopList::class, 'shop_id');
    }
}
