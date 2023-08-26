<?php

namespace App\Repository\Shop;

interface ShopInterface
{
    public function list(float $limit = 15);
    public function get(float $id);
    public function updateOrInsert(float|null $id, array $params, array $paramsDetail);
}
