<?php

namespace App\Repository\History\RechargeHistory;

use App\Models\RechargeHistory;
use App\Models\RechargeList;
use App\Models\ShopList;
use App\Models\User;

interface RechargeHistoryInterface
{
    public function list();
    public function create(array $params, User $user, ShopList $shop, RechargeList $recharge);
    public function exists(array $conditions = []);
}
