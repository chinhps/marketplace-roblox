<?php

namespace App\Repository\Transaction;

use App\Models\TransactionDiamond;
use App\Models\TransactionPrice;
use App\Models\TransactionRobux;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class TransactionRepository implements TransactionInterface
{

    public function __construct(
        private float $value,
        private string $note
    ) {
    }

    public function createPrice()
    {
        new Transaction(
            model: new TransactionPrice,
            custom: ['diamond' => $this->value],
            note: $this->note
        );
    }
    public function createDiamond()
    {
        new Transaction(
            model: new TransactionDiamond,
            custom: ['diamond' => $this->value],
            note: $this->note
        );
    }
    public function creaeteRobux()
    {
        new Transaction(
            model: new TransactionRobux,
            custom: ['robux' => $this->value],
            note: $this->note
        );
    }
}

class Transaction
{
    private $userId;

    public function __construct(
        private Model $model,
        private $note = null,
        private array $custom = []
    ) {
        $this->userId = Auth::user()->id;
    }

    public function create()
    {
        $this->model->create([
            'user_id' => $this->userId,
            'note' => $this->note,
            ...$this->custom
        ]);
    }
}
