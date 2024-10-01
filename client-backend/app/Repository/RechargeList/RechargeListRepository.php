<?php

namespace App\Repository\RechargeList;

use App\Models\RechargeList;
use Illuminate\Database\Eloquent\Model;

class RechargeListRepository implements RechargeListInterface
{
    public function __construct(
        private Model $model = new RechargeList()
    ) {
    }

    public function getByKey(string $key)
    {
        return $this->model->where('recharge_key', $key)->first();
    }
}
