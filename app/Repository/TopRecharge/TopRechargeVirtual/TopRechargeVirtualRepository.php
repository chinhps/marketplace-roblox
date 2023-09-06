<?php

namespace App\Repository\TopRecharge\TopRechargeVirtual;

use App\Models\ShopList;
use App\Models\TopRechargeVirtual;
use Illuminate\Database\Eloquent\Model;

class TopRechargeVirtualRepository implements TopRechargeVirtualInterface
{
    public function __construct(
        private Model $model = new TopRechargeVirtual()
    ) {
    }

    public function list(float $limit = 15)
    {
        return $this->model->with('shop')->paginate($limit);
    }

    public function delete(float $id)
    {
        return $this->model->find($id)->delete();
    }

    public function get(float $id)
    {
        return $this->model->with('shop')->find($id);
    }

    public function updateOrInsert(float|null $id, array $params, ShopList $shop)
    {
        if (!$id) $data = new TopRechargeVirtual();
        if ($id) $data = $this->model->find($id);

        $data->shop()->associate($shop);
        $data->fill($params);
        $data->save();
        return $data;
    }
}
