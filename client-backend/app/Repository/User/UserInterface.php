<?php

namespace App\Repository\User;

use App\Models\ShopList;

interface UserInterface
{
    public function exists(array $conditions = []);
    public function create(array $params, ShopList $shop);
    public function getByConditions(array $conditions = []);
}
