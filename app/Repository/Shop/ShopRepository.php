<?php

namespace App\Repository\Shop;

use App\Models\ShopList;
use Illuminate\Database\Eloquent\Model;

class ShopRepository implements ShopInterface
{
    public function __construct(
        private Model $model = new ShopList()
    ) {
    }

    public function list(float $limit = 15)
    {
        return $this->model->with('shopDetail')->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->with('shopDetail')->find($id);
    }

    public function updateOrInsert(float|null $id, array $params, array $paramsDetail)
    {
        if (!$id) return $this->model->create($params)->shopDetail()->create($paramsDetail);

        $shop = $this->model->find($id);
        $shop->update($params);
        $shop->shopDetail()->update($paramsDetail);
        return $shop;
    }
}