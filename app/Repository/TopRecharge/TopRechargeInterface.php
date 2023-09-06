<?php

namespace App\Repository\TopRecharge;

interface TopRechargeInterface
{
    public function list(float $limit = 15);
    public function delete(float $id);
}
