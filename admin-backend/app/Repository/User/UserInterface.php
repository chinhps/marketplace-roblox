<?php

namespace App\Repository\User;

interface UserInterface
{
    public function list(float $limit = 15, array $filter = []);
    /**
     * @return \App\Models\User
     */
    public function get(float $id);
    public function update(float $id, array $params);
    public function updateOrInsert(float|null $id, array $params);
    public function getByProviderId(string $providerId);
}
