<?php

namespace App\Repository\Service;

use App\Models\GameCurrency;
use App\Models\GameList;

interface ServiceInterface
{
    public function list($limit = 15);
    public function get(float $id);
    public function delete(float $id);
    /**
     * @return \App\Models\Service
     */
    public function updateOrInsert(float|null $id, array $params, GameCurrency|null $gameCurrency, GameList $gameList);
}
