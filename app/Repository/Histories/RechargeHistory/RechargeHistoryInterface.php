<?php

namespace App\Repository\Histories\RechargeHistory;

interface RechargeHistoryInterface
{
    public function list(float $limit = 15);
    public function update(float $id, array $params);
}
