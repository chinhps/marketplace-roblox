<?php

namespace App\Repository\Histories\WithdrawHistory;

interface WithdrawHistoryInterface
{
    public function list(float $limit = 15);
    public function update(float $id, array $params);
}
