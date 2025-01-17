<?php

namespace App\Repository\Transaction;

use App\Models\User;

interface TransactionInterface
{
    public function listPrice(float $limit = 15, array $filter = []);
    public function listDiamond(float $limit = 15, array $filter = []);
    public function listRobux(float $limit = 15, array $filter = []);

    public function createPrice(User $user, float $value, string $note);
    public function createDiamond(User $user, float $value, string $note);
    public function creaeteRobux(User $user, float $value, string $note);
}
