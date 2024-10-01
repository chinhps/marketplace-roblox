<?php

namespace App\Repository\Withdraw\WithdrawLimit;

use App\Models\User;
use App\Models\WithdrawType;

interface WithdrawLimitInterface
{
    public function getLimitUser(User $user, WithdrawType $withdrawType);
}
