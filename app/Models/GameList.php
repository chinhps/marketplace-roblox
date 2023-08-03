<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameList extends Model
{
    use HasFactory;
    protected $table = "games_list";

    public function services()
    {
        return $this->hasMany(Service::class, 'game_id', 'id');
    }
}
