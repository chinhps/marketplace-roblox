<?php

namespace App\Repository\TopRecharge;

interface TopRechargeInterface
{
    public function topRecharges(string $domain, string $month, string $year);
    public function topVirtualRecharges(string $domain, string $month, string $year);
}
