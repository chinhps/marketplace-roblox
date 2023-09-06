<?php

namespace App\Repository\TopRecharge\TopRechargeVirtual;

use App\Models\ShopList;

interface TopRechargeVirtualInterface
{
    public function list(float $limit = 15);
    public function delete(float $id);
    public function get(float $id);
    public function updateOrInsert(float|null $id, array $params, ShopList $shop);
}
