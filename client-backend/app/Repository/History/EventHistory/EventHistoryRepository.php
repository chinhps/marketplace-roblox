<?php

namespace App\Repository\History\EventHistory;

use App\Models\EventHistory;
use App\Models\EventList;
use App\Models\ShopList;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class EventHistoryRepository implements EventHistoryInterface
{
    public function __construct(
        private Model $model = new EventHistory()
    ) {
    }

    public function exists(array $conditions = [])
    {
        return $this->model->where($conditions)->exists();
    }

    public function create(array $params, EventList $event, ShopList $shop, User $user)
    {
        $data = new EventHistory();
        $data->user()->associate($user);
        $data->shop()->associate($shop);
        $data->event()->associate($event);
        $data->fill($params);
        $data->save();
        return $data;
    }
}
