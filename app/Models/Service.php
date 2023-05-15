<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Service extends Model
{
    use HasFactory;
    protected $table = "services";

    public function game_list(): HasOne
    {
        return $this->hasOne(GameList::class,'id','game_id');
    }

}
