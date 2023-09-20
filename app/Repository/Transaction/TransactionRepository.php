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
     * LIST *
     **********/
    public function listPrice(float $limit = 15)
    {
        return TransactionPrice::with('user')->paginate($limit);
    }
    public function listDiamond(float $limit = 15)
    {
        return TransactionDiamond::with('user')->paginate($limit);
    }
    public function listRobux(float $limit = 15)
    {
        return TransactionRobux::with('user')->paginate($limit);
    }

    /**********
     * CREATE *
     **********/
    public function createPrice(User $user, float $value, string $note)
    {
        $user->price_temporary = $user->price_temporary + $value;
        $user->save();
        return (new Transaction(
            model: new TransactionPrice,
            user: $user,
            custom: ['price' =>  $value],
            note: $note
        ))->create();
    }
    public function createDiamond(User $user, float $value, string $note)
    {
        $user->diamond_temporary = $user->diamond_temporary + $value;
        $user->save();
        return (new Transaction(
            model: new TransactionDiamond,
            user: $user,
            custom: ['diamond' =>  $value],
            note: $note
        ))->create();
    }
    public function creaeteRobux(User $user, float $value, string $note)
    {
        $user->robux_temporary = $user->robux_temporary + $value;
        $user->save();
        return (new Transaction(
            model: new TransactionRobux,
            user: $user,
            custom: ['robux' =>  $value],
            note: $note
        ))->create();
    }
}

class Transaction
{
    public function __construct(
        private Model $model,
        private User $user,
        private $note = null,
        private array $custom = []
    ) {
    }

    public function create()
    {
        return $this->model->create([
            'user_id' => $this->user->id,
            'note' => $this->note,
            ...$this->custom
        ]);
    }
}
