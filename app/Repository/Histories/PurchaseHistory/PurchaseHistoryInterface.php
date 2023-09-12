<?php

namespace App\Repository\Histories\PurchaseHistory;

interface PurchaseHistoryInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function update(float $id, array $params);
}
