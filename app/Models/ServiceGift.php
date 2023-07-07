<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceGift extends Model
{
    use HasFactory;
    protected $table = "service_gifts";

    public function gameCurrency()
    {
        return $this->belongsTo(GameCurrency::class, 'game_currency_id');
    }
}
