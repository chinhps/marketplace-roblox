<?php

namespace App\Repository\History\WithdrawHistory;

use App\Models\ShopList;
use App\Models\User;
use App\Models\WithdrawType;

interface WithdrawHistoryInterface
{
    public function list();
    public function create(array $params = [], User $user, ShopList $shop, WithdrawType $withdrawType);
    public function checkLimit(User $user, WithdrawType $withdrawType);
}
