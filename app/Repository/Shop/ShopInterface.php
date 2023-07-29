<?php

namespace App\Repository\Shop;

interface ShopInterface
{
    public function shopId(string $domain);
    public function getInfomation(string $domain);
}
