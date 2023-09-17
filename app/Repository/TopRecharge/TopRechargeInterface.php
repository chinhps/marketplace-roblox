<?php

namespace App\Repository\TopRecharge;

use App\Models\ShopList;
use App\Models\User;

interface TopRechargeInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function delete(float $id);
    public function topRecharges(string $domain, string $month, string $year);
    public function exists(array $conditions = [], $month, $year);
    public function updateOrCreate(float|null $id, float $price, User $user, ShopList $shop);
}
