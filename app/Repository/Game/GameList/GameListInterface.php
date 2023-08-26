<?php

namespace App\Repository\Game\GameList;

interface GameListInterface
{
    /**
     * @var \App\Models\GameList
     */
    public function get(float $id);
}
