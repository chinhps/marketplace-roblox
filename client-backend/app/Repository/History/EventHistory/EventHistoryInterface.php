<?php

namespace App\Repository\History\EventHistory;

use App\Models\EventList;
use App\Models\ShopList;
use App\Models\User;

interface EventHistoryInterface
{
    public function create(array $params, EventList $event, ShopList $shop, User $user);
    public function exists(array $conditions = []);
}
