<?php

namespace App\Repository\User;

interface UserInterface
{
    public function checkUniqueProviderId($providerId);
    public function create(array $params);
}
