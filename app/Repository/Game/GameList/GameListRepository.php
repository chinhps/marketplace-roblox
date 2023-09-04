<?php

namespace App\Repository\Game\GameList;

use App\Models\GameList;
use Illuminate\Database\Eloquent\Model;

class GameListRepository implements GameListInterface
{
    public function __construct(
        private Model $model = new GameList()
    ) {
    }

    public function get(float $id)
    {
        return $this->model->find($id);
    }
    public function getByGameKey(string $key)
    {
        return $this->model->where('game_key', $key)->first();
    }
}
