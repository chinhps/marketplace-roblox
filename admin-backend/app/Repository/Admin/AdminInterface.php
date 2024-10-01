<?php

namespace App\Repository\Admin;

use App\Models\ShopList;
use App\Models\User;

interface AdminInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function get(float $id);
    public function delete(float $id);
    public function updateOrInsert(float|null $id, array $params, ?User $user, ?ShopList $shopList);
}
