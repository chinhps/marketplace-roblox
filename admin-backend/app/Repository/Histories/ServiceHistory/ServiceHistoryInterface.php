<?php

namespace App\Repository\Histories\ServiceHistory;

interface ServiceHistoryInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function updateOrInsert(float|null $id, array $params);
}
