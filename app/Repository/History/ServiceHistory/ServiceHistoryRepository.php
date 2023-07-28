<?php

namespace App\Repository\History\ServiceHistory;

use App\Models\Service;
use App\Models\ServiceHistory;
use App\Models\User;

class ServiceHistoryRepository implements ServiceHistoryInterface
{
    public function create(User $user, Service $service, float $quantity, array $detail)
    {
        $history = new ServiceHistory;
        $history->quantity = $quantity;
        $history->detail = json_encode($detail);
        $history->shop()->associate($user->shop);
        $history->service()->associate($service);
        $history->user()->associate($user);
        $history->save();
        return $history;
    }
    public function getQuantityUserByService(User $user, Service $service)
    {
        $history = ServiceHistory::where('user_id', $user->id)
            ->where('service_id', $service->id)
            ->whereMonth('created_at', date('m')) // only current month
            ->sum('quantity');
        return $history;
    }
}
