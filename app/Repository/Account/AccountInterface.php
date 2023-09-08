<?php

namespace App\Repository\Account;

use App\Models\Admin;
use App\Models\Service;

interface AccountInterface
{
    public function list(float $limit = 15);
    public function get(float $id);
    public function delete(float $id);
    public function updateOrInsert(float|null $id, array $params, Admin $admin, Service $service);
}
