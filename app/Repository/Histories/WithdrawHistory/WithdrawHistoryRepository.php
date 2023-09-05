<?php

namespace App\Repository\Histories\WithdrawHistory;

use App\Models\WithdrawHistory;
use Illuminate\Database\Eloquent\Model;

class WithdrawHistoryRepository implements WithdrawHistoryInterface
{
    public function __construct(
        private Model $model = new WithdrawHistory()
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
