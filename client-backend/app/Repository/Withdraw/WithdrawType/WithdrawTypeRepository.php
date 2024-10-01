<?php

namespace App\Repository\Withdraw\WithdrawType;

use App\Models\WithdrawType;
use Illuminate\Database\Eloquent\Model;

class WithdrawTypeRepository implements WithdrawTypeInterface
{
    public function __construct(
        public Model $model = new WithdrawType()
    ) {
    }

    public function getByKey(string $key)
    {
        return $this->model->where('type_key', $key)->first();
    }
}
