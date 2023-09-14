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

    public function list(float $limit = 15, array $filter = [])
    {
        $data = $this->model->with(['user', 'shop']);
        $data = queryRepository($data, $filter);
        return $data->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->with(['user', 'shop'])->find($id);
    }

    public function update(float $id, array $params)
    {
        return $this->model->find($id)->update($params);
    }
}
