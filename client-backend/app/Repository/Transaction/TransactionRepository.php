<?php

namespace App\Repository\Transaction;

use App\Models\TransactionDiamond;
use App\Models\TransactionPrice;
use App\Models\TransactionRobux;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class TransactionRepository implements TransactionInterface
{
    /**********
     * GET *
     **********/
    public function getPrice(User $user)
    {
        $value = TransactionPrice::where('user_id', $user->id)->sum('price');
        $user->price_temporary = $value;
        $user->save();
        return $value;
    }
    public function getDiamond(User $user)
    {
        $value = TransactionDiamond::where('user_id', $user->id)->sum('diamond');
        $user->diamond_temporary = $value;
        $user->save();
        return $value;
    }
    public function getRobux(User $user)
    {
        $value = TransactionRobux::where('user_id', $user->id)->sum('robux');
        $user->robux_temporary = $value;
        $user->save();
        return $value;
    }

    /**********
     * CREATE *
     **********/
    public function createPrice(float $value, string $note)
    {
        return $this->performTransaction(new TransactionPrice(), 'price', $value, $note);
    }

    public function createDiamond(float $value, string $note)
    {
        return $this->performTransaction(new TransactionDiamond(), 'diamond', $value, $note);
    }

    public function createRobux(float $value, string $note)
    {
        return $this->performTransaction(new TransactionRobux(), 'robux', $value, $note);
    }

    private function performTransaction(Model $model, string $column, float $value, string $note)
    {
        $user = User::find(Auth::id());
        $user->setAttribute($column . '_temporary', $user->getAttribute($column . '_temporary') + $value);
        $user->save();
        return (new Transaction(
            model: $model,
            custom: [$column => $value],
            note: $note
        ))->create();
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
        $this->userId = Auth::id();
    }

    public function create()
    {
        return $this->model->create([
            'user_id' => $this->userId,
            'note' => $this->note,
            ...$this->custom
        ]);
    }
}
