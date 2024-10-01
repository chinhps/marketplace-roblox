<?php

namespace App\Repository\Game\GameCurrency;

interface GameCurrencyInterface
{
    /**
     * @return \App\Models\GameCurrency
     */
    public function get(float $id);
    /**
     * @return \App\Models\GameCurrency
     */
    public function getByKey(string $key);
}
