<?php

namespace App\Repository\Histories\RechargeHistory;

interface RechargeHistoryInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function get(float $id);
    public function update(float $id, array $params);
}
