<?php

namespace App\Repository\Withdraw\WithdrawType;

interface WithdrawTypeInterface
{
    public function getByKey(string $key);
}
