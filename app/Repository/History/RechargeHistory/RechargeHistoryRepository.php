<?php

namespace App\Repository\History\RechargeHistory;

use App\Models\RechargeHistory;
use App\Models\RechargeList;
use App\Models\ShopList;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class RechargeHistoryRepository implements RechargeHistoryInterface
{

    public function __construct(
        private Model $model = new RechargeHistory()
    ) {
    }

    public function list()
    {
        return $this->model->where('user_id', Auth::user()->id)
            ->orderBy('id', 'desc')
            ->with(['recharge'])
            ->paginate(10);
    }

    public function create(array $params, User $user, ShopList $shop, RechargeList $recharge)
    {
        $rechargeHistory = new RechargeHistory();
        $rechargeHistory->user()->associate($user);
        $rechargeHistory->shop()->associate($shop);
        $rechargeHistory->recharge()->associate($recharge);
        $rechargeHistory->fill($params);
        $rechargeHistory->save();
        return $rechargeHistory;
    }

    public function exists(array $conditions = [])
    {
        $exists = $this->model->whereJsonContains('detail', $conditions);
        return $exists->exists();
    }
}
