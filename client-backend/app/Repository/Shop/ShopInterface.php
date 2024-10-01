<?php

namespace App\Repository\Shop;

interface ShopInterface
{
    public function getByDomain(string $domain);
    public function getInfomation(string $domain);
}
