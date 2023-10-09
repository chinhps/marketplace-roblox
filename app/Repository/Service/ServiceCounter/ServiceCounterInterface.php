<?php

namespace App\Repository\Service\ServiceCounter;

use App\Models\Service;

interface ServiceCounterInterface {
    public function increase(Service $service, float $count = 1);
}