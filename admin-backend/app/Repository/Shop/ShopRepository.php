<?php

namespace App\Repository\Shop;

use App\Models\ShopList;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ShopRepository implements ShopInterface
{
    public function __construct(
        private Model $model = new ShopList()
    ) {
    }

    public function list(float $limit = 15, array $filter = [])
    {
        $shopList = $this->model->with('shopDetail');
        $shopList = queryRepository($shopList, $filter);
        if ($limit == 1) return $shopList->first();
        return $shopList->paginate($limit);
    }

    public function all()
    {
        $user = Auth::user();
        $data = $this->model;
        if (Gate::allows('koc', $user)) {
            $data = $data->where('domain', $user->shop->domain);
        }
        return $data->orderBy('stt', 'desc')->get();
    }

    public function get(float $id)
    {
        return $this->model->with('shopDetail')->find($id);
    }

    public function getByListDomain(array $domains)
    {
        return $this->model->whereIn('domain', $domains)->get();
    }

    public function getByDomain(string $domain)
    {
        return $this->model->where('domain', $domain)->first();
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
