<?php

namespace App\Repository\TopRecharge;

interface TopRechargeInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function delete(float $id);
    public function topRecharges(string $domain, string $month, string $year);
}
