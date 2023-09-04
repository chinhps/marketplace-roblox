<?php

namespace App\Repository\Game\GameCurrency;

use App\Models\GameCurrency;
use Illuminate\Database\Eloquent\Model;

class GameCurrencyRepository implements GameCurrencyInterface
{
    public function __construct(
        private Model $model = new GameCurrency()
    ) {
    }

    public function get(float $id)
    {
        return $this->model->find($id);
    }

    public function getByKey(string $key)
    {
        return $this->model->where('currency_key', $key)->first();
    }
}
