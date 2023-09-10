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

    public function list(float $limit = 15, array $filter = [])
    {
        $shopList = $this->model->with('shopDetail');
        if (isset($filter['query'])) {
            $shopList->where($filter['query']);
        }
        if (isset($filter['sort'])) {
            foreach ($filter['sort'] as $valueSort) {
                $shopList->orderBy($valueSort[0], $valueSort[1]);
            }
        }
        if (!isset($filter['sort'])) {
            $shopList->orderBy('id', 'desc');
        }
        return $shopList->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->with('shopDetail')->find($id);
    }

    public function getByListDomain(array $domains)
    {
        return $this->model->whereIn('domain', $domains)->get();
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
