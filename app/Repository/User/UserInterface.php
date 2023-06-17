<?php

namespace App\Repository\User;

interface UserInterface
{
    public function checkUniqueProviderId($providerId);
    public function create(array $params);
    public function updatePrice(float $price, string $note);
    public function updateDiamond(float $diamond, string $note);
    public function updateRobux(float $robux, string $note);
}
