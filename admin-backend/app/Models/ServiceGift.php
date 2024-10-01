<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceGift extends Model
{
    use HasFactory;
    protected $table = "service_gifts";
    protected $guarded = [];

    public function gameCurrency()
    {
        return $this->belongsTo(GameCurrency::class, 'game_currency_id');
    }

    public function serviceOdds(): BelongsTo
    {
        return $this->belongsTo(ServiceOdds::class, 'odds_id');
    }
}
