<?php

namespace App\Repository\Histories\ServiceHistory;

use App\Models\ServiceHistory;
use Illuminate\Database\Eloquent\Model;

class ServiceHistoryRepository implements ServiceHistoryInterface
{
    public function __construct(
        private Model $model = new ServiceHistory()
    ) {
    }

    public function list(float $limit = 15)
    {
        return $this->model->with(['service', 'user', 'shop'])->paginate($limit);
    }

    public function updateOrInsert(float|null $id, array $params)
    {
    }
}
