<?php

namespace App\Repository\Service\ServiceGift;

use App\Models\GameCurrency;
use App\Models\ServiceGift;
use App\Models\ServiceOdds;

interface ServiceGiftInterface
{
    public function list($limit = 15, $filter = []);
    public function delete($ids = []);
    /**
     * @return \App\Models\ServiceGift
     */
    public function updateOrInsert(float|null $id, array $params, ServiceOdds $serviceOdds, GameCurrency $gameCurrency);
}
