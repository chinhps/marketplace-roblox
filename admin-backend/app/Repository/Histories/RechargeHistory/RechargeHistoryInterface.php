<?php

namespace App\Repository\Histories\RechargeHistory;

use App\Models\RechargeHistory;

interface RechargeHistoryInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function get(float $id);
    public function update(float $id, array $params);
    public function getByCondition(array $conditions = [], array $where = []);
    public function changeStatus(RechargeHistory $rechargeHistory, $status);
}
