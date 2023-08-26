<?php

namespace App\Repository\Game\GameCurrency;

interface GameCurrencyInterface
{
    /**
     * @var \App\Models\GameCurrency
     */
    public function get(float $id);
}
