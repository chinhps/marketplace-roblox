<?php

namespace App\Repository\Service;

use App\Models\GameCurrency;
use App\Models\GameList;

interface ServiceInterface
{
    public function list($limit = 15, array $filter = []);
    public function listServiceByGameList(string $gameKey);
    public function get(float $id, float|null $idDetail = null);
    public function delete(float $id);
    /**
     * @return \App\Models\Service
     */
    public function updateOrInsert(float|null $id, array $params, GameCurrency|null $gameCurrency, GameList $gameList);
}
