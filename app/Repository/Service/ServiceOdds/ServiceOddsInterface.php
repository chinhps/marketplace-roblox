<?php

namespace App\Repository\Service\ServiceOdds;

interface ServiceOddsInterface
{
    public function list($limit = 15);
    public function get(float $id);
    public function delete(float $id);
    public function updateOrInsert(float|null $id, array $params);
}
