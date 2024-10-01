<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventHistory extends Model
{
    use HasFactory;
    protected $table = "event_histories";

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(ShopList::class, 'shop_id');
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(EventList::class, 'event_id');
    }
}
