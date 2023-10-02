<?php

namespace App\Repository\Shop;

interface ShopInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function get(float $id);
    public function updateOrInsert(float|null $id, array $params, array $paramsDetail);
    /**
     * @return \Illuminate\Support\Collection|\App\Models\ShopList[]
     */
    public function getByListDomain(array $domains);
    public function all();
    public function getByDomain(string $domain);
}
