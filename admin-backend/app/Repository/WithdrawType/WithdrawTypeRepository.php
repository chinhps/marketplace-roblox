<?php

namespace App\Repository\WithdrawType;

use App\Models\WithdrawType;
use Illuminate\Database\Eloquent\Model;

class WithdrawTypeRepository implements WithdrawTypeInterface
{
    public function __construct(
        private Model $model = new WithdrawType()
    ) {
    }

    public function all()
    {
        return $this->model->orderBy('id', 'desc')->get();
    }

    public function get(float $id)
    {
        return $this->model->find($id);
    }
}
