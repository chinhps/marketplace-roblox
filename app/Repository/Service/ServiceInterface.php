<?php

namespace App\Repository\Service;

use App\Models\Service;
use App\Models\User;

interface ServiceInterface
{
    public function serviceTurn(Service $service, User $user);
}
