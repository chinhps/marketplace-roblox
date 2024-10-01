<?php

namespace App\Repository\History\PurchaseHistory;

use App\Models\AccountList;
use App\Models\Admin;
use App\Models\User;

interface PurchaseHistoryInterface
{
    public function create(User $user, Admin $admin, AccountList $account);
    public function list();
}
