<?php

namespace App\Repository\Service\ServiceDetail;

use App\Models\Service;
use App\Models\User;

interface ServiceDetailInterface
{
    public function idServiceDetailList(string $domain);
    public function serviceDetail(string $slug, array $listIdAllow);
    public function serviceTurn(User $user, Service $service);
}
