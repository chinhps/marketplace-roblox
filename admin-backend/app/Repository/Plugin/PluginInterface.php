<?php

namespace App\Repository\Plugin;

interface PluginInterface
{
    public function list(float $limit = 15, array $filter = []);
    public function get(float $id);
    public function updateOrInsert(float|null $id, array $params);
    public function getByKey(string $key);
}
