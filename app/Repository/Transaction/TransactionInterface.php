<?php

namespace App\Repository\Transaction;

use App\Models\User;

interface TransactionInterface
{
    public function listPrice(float $limit = 15);
    public function listDiamond(float $limit = 15);
    public function listRobux(float $limit = 15);

    public function createPrice(float $value, string $note);
    public function createDiamond(float $value, string $note);
    public function creaeteRobux(float $value, string $note);
    public function getPrice(User $user);
    public function getDiamond(User $user);
    public function getRobux(User $user);
}
