<?php

namespace App\Repository\Withdraw\WithdrawLimit;

use App\Models\User;
use App\Models\WithdrawalLimit;
use App\Models\WithdrawType;
use Illuminate\Database\Eloquent\Model;

class WithdrawLimitRepository implements WithdrawLimitInterface
{
    public function __construct(
        public Model $model = new WithdrawalLimit()
    ) {
    }

    public function getLimitUser(User $user, WithdrawType $withdrawType)
    {
        return $this->model->where('user_id', $user->id)
            ->where('withdraw_type_id', $withdrawType->id)
            ->where('active','ON')
            ->first();
    }
}
