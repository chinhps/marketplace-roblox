<?php

namespace App\Repository\Service;

use App\Models\GameCurrency;
use App\Models\GameList;
use App\Models\Service;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ServiceRepository implements ServiceInterface
{
    public function __construct(
        private Model $model = new Service
    ) {
    }

    public function list($limit = 15, array $filter = [])
    {
        $query = $this->model->with(['currency', 'serviceCouter'])->withCount('serviceDetails');
        $query = queryRepository($query, $filter);
        return $query->paginate($limit);
    }

    public function listServiceByGameList(string $gameKey)
    {
        $query = $this->model->with("currency")->whereHas('game_list', function (Builder $query) use ($gameKey) {
            $query->where('game_key', $gameKey);
        });
        return $query->get();
    }

    public function get(float $id)
    {
        return $this->model->with('currency')->find($id);
    }

    public function delete(float $id)
    {
        return $this->model->find($id)->delete();
    }

    public function updateOrInsert(float|null $id, array $params, GameCurrency|null $gameCurrency, GameList $gameList)
    {
        if (!$id) {
            $data = new Service();
            $data->game_id = $gameList->id;
            $data->fill($params);
        }

        if (!isset($data)) {
            $data = $this->model->find($id);
            $data->game_id = $gameList->id;
            $data->update($params);
        }

        if ($gameCurrency) {
            $data->game_currency_id = $gameCurrency->id;
            $data->save();
            return $data;
        }

        $data->game_currency_id = null;
        $data->save();
        return $data;
    }
}
