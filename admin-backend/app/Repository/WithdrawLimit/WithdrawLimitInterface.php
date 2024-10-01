<?php

namespace App\Repository\WithdrawLimit;

use App\Models\User;
use App\Models\WithdrawType;

interface WithdrawLimitInterface
{
    public function get(float $id);
    public function list(float $limit = 15, array $filter = []);
    public function delete(float $id);
    public function updateOrInsert(float|null $id, array $params, User $user, WithdrawType $withdrawType);
}
