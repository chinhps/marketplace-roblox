<?php

namespace App\Repository\Service;

use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class ServiceRepository implements ServiceInterface
{
    public function __construct(
        private Model $model = new Service
    ) {
    }
    public function serviceTurn(Service $service, User $user)
    {
        return $this->model
            ->find($service->id)
            ->serviceTurns()
            ->where('id', $user->id)
            ->select('turn')
            ->first()
            ->turn ?? false;
    }

    public function decrementTurn(Service $service, User $user, float $turn)
    {
        return $this->model
            ->find($service->id)
            ->serviceTurns()
            ->where('id', $user->id)
            ->select('turn')
            ->decrement('turn', $turn) ?? false;
    }
}
