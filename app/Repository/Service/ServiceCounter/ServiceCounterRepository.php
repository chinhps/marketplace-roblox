<?php

namespace App\Repository\Service\ServiceCounter;

use App\Models\Service;
use App\Models\ServiceCounter;
use Illuminate\Database\Eloquent\Model;

class ServiceCounterRepository implements ServiceCounterInterface
{
    public function __construct(
        private Model $model = new ServiceCounter()
    ) {
    }

    public function increase(Service $service)
    {
        $serviceCounter = $this->model->where('service_id', $service->id)->first();
        if (!$serviceCounter) {
            $serviceCounter = new ServiceCounter();
            $serviceCounter->service()->associate($service);
            $serviceCounter->value = 1000;
            $serviceCounter->save();
        }
        $serviceCounter->increment('value');
        return $serviceCounter;
    }
}
