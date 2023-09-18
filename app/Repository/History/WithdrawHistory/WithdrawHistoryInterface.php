<?php

namespace App\Repository\History\WithdrawHistory;

use App\Models\ShopList;
use App\Models\User;

interface WithdrawHistoryInterface
{
    public function list();
    public function create(array $params = [], User $user, ShopList $shop);
}
