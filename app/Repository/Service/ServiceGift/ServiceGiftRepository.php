<?php

namespace App\Repository\Service\ServiceGift;

use App\Models\GameCurrency;
use App\Models\ServiceGift;
use App\Models\ServiceOdds;
use Illuminate\Database\Eloquent\Model;

class ServiceGiftRepository implements ServiceGiftInterface
{
    public function __construct(
        private Model $model = new ServiceGift()
    ) {
    }

    public function list($limit = 15, $filter = [])
    {
        if ($limit == 0) {
            return $this->model->where($filter)->get();
        }
        return $this->model->where($filter)->paginate($limit);
    }
    
    public function delete($ids = [])
    {
        return $this->model->whereIn('id', $ids)->delete();
    }

    public function updateOrInsert(float|null $id, array $params, ServiceOdds $serviceOdds, GameCurrency $gameCurrency)
    {
        $newGift = new ServiceGift();
        if ($id) {
            $newGift = $this->model->find($id);
        }
        $newGift->serviceOdds()->associate($serviceOdds);
        $newGift->gameCurrency()->associate($gameCurrency);
        $newGift->fill($params);
        $newGift->save();
        return $newGift;
    }
}
