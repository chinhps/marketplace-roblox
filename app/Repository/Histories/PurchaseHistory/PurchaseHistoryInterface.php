<?php

namespace App\Repository\Histories\PurchaseHistory;

use App\Models\Admin;

interface PurchaseHistoryInterface
{
    public function allAmountPartner(Admin $admin);
    public function list(float $limit = 15, array $filter = []);
    public function update(float $id, array $params);
}
