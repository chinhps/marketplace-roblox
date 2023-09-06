<?php

namespace App\Repository\TopRecharge;

use App\Models\TopRecharge;
use Illuminate\Database\Eloquent\Model;

class TopRechargeRepository implements TopRechargeInterface
{
    public function __construct(
        private Model $model = new TopRecharge()
    ) {
    }

    public function list(float $limit = 15)
    {
        return $this->model->with(['user', 'shop'])->paginate($limit);
    }

    public function delete(float $id)
    {
        return $this->model->find($id)->delete();
    }
}
