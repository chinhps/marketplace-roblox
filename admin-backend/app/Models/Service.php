<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Service extends Model
{
    use HasFactory;
    protected $table = "services";
    protected $guarded = [];

    public function game_list(): BelongsTo
    {
        return $this->belongsTo(GameList::class, 'game_id');
    }

    public function currency(): HasOne
    {
        return $this->hasOne(GameCurrency::class, 'id', 'game_currency_id');
    }

    public function serviceCouter(): HasOne
    {
        return $this->hasOne(ServiceCounter::class, 'service_id', 'id');
    }

    public function serviceTurns(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'service_turns', 'service_id', 'user_id')->withPivot('turn');
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(AccountList::class, 'service_id', 'id');
    }

    public function serviceDetails(): HasMany
    {
        return $this->hasMany(ServiceDetail::class, 'service_id');
    }
}
