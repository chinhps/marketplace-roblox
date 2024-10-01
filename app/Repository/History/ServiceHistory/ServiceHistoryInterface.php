<?php

namespace App\Repository\History\ServiceHistory;

use App\Models\Service;
use App\Models\User;

interface ServiceHistoryInterface
{
    public function create(User $user, Service $service, float $quantity, array $detail);
    public function getQuantityUserByService(User $user, Service $service);
    public function list();
}
