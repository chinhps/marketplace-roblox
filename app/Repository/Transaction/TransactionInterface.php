<?php

namespace App\Repository\Transaction;

interface TransactionInterface
{
    public function __construct(float $value, string $note);
    public function createPrice();
    public function createDiamond();
    public function creaeteRobux();
}
