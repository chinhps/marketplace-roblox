<?php

namespace App\Repository\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserRepository implements UserInterface
{
    public function __construct(
        private Model $model = new User()
    ) {
    }

    public function list(float $limit = 15)
    {
        return $this->model->with('shop')->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->with([
            'rechargeHistories',
            'withdrawHistories',
            'purchaseHistories',
            'serviceHistories',
            'eventHistories',
            'transactionsPrice',
            'transactionsDiamond',
            'transactionsRobux'
        ])->find($id);
    }

    public function updateOrInsert(float|null $id, array $params)
    {
    }
}
