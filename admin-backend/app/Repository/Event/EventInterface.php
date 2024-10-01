<?php

namespace App\Repository\Event;

interface EventInterface
{
    public function list(float $limit = 15);
    public function get(float $id);
    public function delete(float $id);
    public function updateOrInsert(float|null $id, array $params);
}
