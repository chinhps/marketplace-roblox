<?php

namespace App\Repository\Admin;

use App\Models\Admin;
use App\Models\ShopList;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class AdminRepository implements AdminInterface
{
    public function __construct(
        private Model $model = new Admin()
    ) {
    }

    public function list(float $limit = 15, array $filter = [])
    {
        $builder = $this->model->with('shop');
        $builder = queryRepository($builder, $filter);

        return $builder->withSum(['purchaseHistories' => function ($query) {
            $query->where('refund', 'NO');
        }], 'price')->withCount(['accounts' => function ($query) {
            $query->where('status', 'SOLD')->where('active', 'YES');
        }])->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->find($id);
    }

    public function delete(float $id)
    {
        return $this->model->find($id)->delete();
    }

    public function updateOrInsert(float|null $id, array $params, ?User $user, ?ShopList $shopList)
    {

        if (!$id) {
            $data = new Admin();
        }
        if ($id) {
            $data = $this->model->find($id);
        }

        if ($shopList) $data->shop()->associate($shopList);
        if ($user) $data->user()->associate($user);

        $data->fill($params);
        $data->save();
        return $data;
    }
}
