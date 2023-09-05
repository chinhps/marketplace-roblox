<?php

namespace App\Repository\Histories\RechargeHistory;

use App\Models\RechargeHistory;
use Illuminate\Database\Eloquent\Model;

class RechargeHistoryRepository implements RechargeHistoryInterface
{
    public function __construct(
        private Model $model = new RechargeHistory()
    ) {
    }

    public function list(float $limit = 15)
    {
        return $this->model->paginate($limit);
    }

    public function update(float $id, array $params)
    {
        return $this->model->find($id)->update($params);
    }
}
