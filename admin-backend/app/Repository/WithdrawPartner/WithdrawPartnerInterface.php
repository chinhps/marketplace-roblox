<?php

namespace App\Repository\WithdrawPartner;

use App\Models\Admin;

interface WithdrawPartnerInterface
{
    public function getCurrentAmount(Admin $admin, float $allAmount);
    public function list(float $limit = 15, array $filter = []);
    public function updateOrInsert(float|null $id, array $params, Admin $admin);
}
