<?php

namespace App\Repository\Shop;

use App\Models\ShopList;
use Illuminate\Database\Eloquent\Model;

class ShopRepository implements ShopInterface
{
    public function __construct(
        private Model $model = new ShopList
    ) {
    }

    public function shopId(string $domain)
    {
        return $this->model->where('domain', $domain)->first()->id;
    }

    public function getInfomation(string $domain)
    {
        return $this->model->where('domain', $domain)->with('shopdetails')->first()->shopdetails;
    }
}
