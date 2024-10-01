<?php

namespace App\Repository\Account;

use App\Models\Admin;
use App\Models\Service;

interface AccountInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function get(float $id);
    public function delete(float $id);
    public function updateOrInsert(float|null $id, array $params, Admin $admin, Service $service);
    public function updatePriceRandom(Service $service, float $price);
}
