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

    public function list(float $limit = 15, array $filter = [])
    {
        $builder = $this->model->with('shop');
        $builder = queryRepository($builder, $filter);
        return $builder->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->with([
            'shop',
            'admin' => function ($query) {
                $query->where('admin_type', 'KOC');
            },
            // 'rechargeHistories',
            // 'withdrawHistories',
            // 'purchaseHistories',
            // 'serviceHistories',
            // 'eventHistories',
            // 'transactionsPrice',
            // 'transactionsDiamond',
            // 'transactionsRobux'
        ])
            ->withSum('transactionsPrice', 'price')
            ->withSum('transactionsDiamond', 'diamond')
            ->withSum('transactionsRobux', 'robux')
            ->find($id);
    }

    public function updateOrInsert(float|null $id, array $params)
    {
    }
}
