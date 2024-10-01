<?php

namespace App\Repository\WithdrawType;

interface WithdrawTypeInterface
{
    public function all();
    /**
     * @return \App\Models\WithdrawType
     */
    public function get(float $id);
}
