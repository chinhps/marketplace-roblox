<?php

namespace App\Repository\Histories\WithdrawHistory;

interface WithdrawHistoryInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function get(float $id);
    public function update(float $id, array $params);
    public function getByConditions(array $conditions = []);
}
