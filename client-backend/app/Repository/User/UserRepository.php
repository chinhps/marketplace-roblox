<?php

namespace App\Repository\User;

use App\Models\ShopList;
use App\Models\User;
use App\Repository\Transaction\TransactionInterface;
use Illuminate\Support\Facades\Auth;

class UserRepository implements UserInterface
{
    public function exists(array $conditions = [])
    {
        return User::select('provider_id')
            ->where($conditions)
            ->exists();
    }

    public function getByConditions(array $conditions = [])
    {
        return User::where($conditions)->first();
    }

    public function create(array $params, ShopList $shop)
    {
        $user = new User();
        $user->shop()->associate($shop);
        $user->fill([
            ...$params,
            'price_temporary' => 0,
            'diamond_temporary' => 0,
            'robux_temporary' => 0,
            'block' => 'off',
            'active' => 'on'
        ]);
        $user->save();
        return $user;
    }
}
