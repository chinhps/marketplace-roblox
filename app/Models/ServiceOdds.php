<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ServiceOdds extends Model
{
    use HasFactory;
    protected $table = "service_odds";

    public function serviceGifts(): HasMany
    {
        return $this->hasMany(ServiceGift::class, 'odds_id', 'id');
    }

    public function serviceDetail(): HasOne
    {
        return $this->hasOne(ServiceDetail::class, 'service_odds_id');
    }
}
