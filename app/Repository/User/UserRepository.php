<?php

namespace App\Repository\User;

use App\Models\User;
use App\Repository\Transaction\TransactionInterface;
use Illuminate\Support\Facades\Auth;

class UserRepository implements UserInterface
{
    private $modelTransaction;

    public function __construct()
    {
        $this->modelTransaction = TransactionInterface::class;
    }

    public function checkUniqueProviderId($providerId)
    {
        return User::select('provider_id')->where('provider_id', $providerId)->count() === 0;
    }

    /**
     * Create User
     *
     * @param  array $params
     * Params is:
     * - shop_id 
     * - login_type
     * - provider_id
     * - name
     * - username
     * - password
     * 
     * @return void|false
     */
    public function create(array $params)
    {
        try {
            return User::create([
                ...$params,
                'price_temporary' => 0,
                'diamond_temporary' => 0,
                'block' => 'off',
                'active' => 'on'
            ]);
        } catch (\Exception $e) {
            return false;
        }
    }

    public function updatePrice(float $price, string $note)
    {
        $trans = new $this->modelTransaction(
            value: $price,
            note: $note
        );
        $trans->createPrice();
    }

    public function updateDiamond(float $diamond, string $note)
    {
        $trans = new $this->modelTransaction(
            value: $diamond,
            note: $note
        );
        $trans->createDiamond();
    }

    public function updateRobux(float $robux, string $note)
    {
        $trans = new $this->modelTransaction(
            value: $robux,
            note: $note
        );
        $trans->createRobux();
    }
}
