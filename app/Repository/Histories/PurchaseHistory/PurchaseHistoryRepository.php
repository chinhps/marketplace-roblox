<?php

namespace App\Repository\Histories\PurchaseHistory;

use App\Models\PurchaseHistory;
use Illuminate\Database\Eloquent\Model;

class PurchaseHistoryRepository implements PurchaseHistoryInterface
{
    public function __construct(
        private Model $model = new PurchaseHistory()
    ) {
    }

    public function list(float $limit = 15)
    {
        return $this->model->paginate($limit);
    }

    public function update(float $id, array $params)
    {
        return $this->model->find($id)->update($params);
    }
}
