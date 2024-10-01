<?php

namespace App\Repository\Histories\EventHistory;

use App\Models\EventHistory;
use Illuminate\Database\Eloquent\Model;

class EventHistoryRepository implements EventHistoryInterface
{
    public function __construct(
        private Model $model = new EventHistory()
    ) {
    }

    public function list(float $limit = 15)
    {
        return $this->model->with(['user', 'shop', 'event'])->paginate($limit);
    }

    public function updateOrInsert(float|null $id, array $params)
    {
    }
}
