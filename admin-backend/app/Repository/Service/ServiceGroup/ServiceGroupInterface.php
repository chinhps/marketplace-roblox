<?php

namespace App\Repository\Service\ServiceGroup;

interface ServiceGroupInterface
{
    public function list($limit = 15);
    public function get(float $id);
    public function delete(float $id);
    public function updateOrInsert(float|null $id, array $params);
}
