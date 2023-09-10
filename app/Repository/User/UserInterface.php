<?php

namespace App\Repository\User;

interface UserInterface
{
    public function list(float $limit = 15);
    public function get(float $id);
    public function updateOrInsert(float|null $id, array $params);
}