<?php

namespace App\Repository\Histories\EventHistory;

interface EventHistoryInterface
{
    public function list(float $limit = 15);
    public function updateOrInsert(float|null $id, array $params);
}
