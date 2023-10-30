<?php

namespace App\Repository\WithdrawLimit;

use App\Models\User;
use App\Models\WithdrawalLimit;
use App\Models\WithdrawType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class WithdrawLimitRepository implements WithdrawLimitInterface
{
    public function __construct(
        private Model $model = new WithdrawalLimit()
    ) {
    }

    public function delete(float $id)
    {
        return $this->model->find($id)->delete();
    }

    public function list(float $limit = 15, array $filter = [])
    {
        $data = $this->model->with(["user.shop", "withdrawType"])
            ->withSum(['userWithdraw' => function ($query) {
                $query->select(DB::raw('SUM(value)'))
                    ->from('withdraw_histories')
                    ->whereColumn('withdrawal_limits.user_id', 'withdraw_histories.user_id')
                    ->whereIn('withdraw_histories.status', ['SUCCESS', 'PROCESSING', 'PENDING'])
                    ->whereColumn('withdrawal_limits.withdraw_type_id', 'withdraw_histories.withdraw_type_id')
                    ->whereMonth('withdraw_histories.created_at', date('m'))
                    ->whereYear('withdraw_histories.created_at', date('Y'));
            }], 'value');
        $data = queryRepository($data, $filter);
        return $data->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->with(["user", "withdrawType"])->find($id);
    }

    public function updateOrInsert(float|null $id, array $params, User $user, WithdrawType $withdrawType)
    {
        if (!$id) {
            $data = new WithdrawalLimit();
        }
        if ($id) {
            $data = $this->model->find($id);
        }
        $data->user()->associate($user);
        $data->withdrawType()->associate($withdrawType);
        $data->fill($params);
        $data->save();
        return $data;
    }
}
