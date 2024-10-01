<?php

namespace App\Repository\Histories\RechargeHistory;

use App\Models\RechargeHistory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class RechargeHistoryRepository implements RechargeHistoryInterface
{
    public function __construct(
        private Model $model = new RechargeHistory()
    ) {
    }

    public function list(float $limit = 15, array $filter = [])
    {
        $user = Auth::user();
        if (Gate::allows('admin', $user)) {
            $data = $this->model;
        }
        if (Gate::allows('koc', $user)) {
            $data = $this->model->whereHas('shop', function (Builder $query) use ($user) {
                $query->where('id', $user->shop->id);
            });
        }
        $data = $data->with(['recharge', 'user', 'shop']);
        $data = queryRepository($data, $filter);
        return $data->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->with('user')->find($id);
    }

    public function update(float $id, array $params)
    {
        return $this->model->find($id)->update($params);
    }

    public function getByCondition(array $conditions = [], array $where = [])
    {
        $data = $this->model->whereJsonContains('detail', $conditions);
        if (count($where) > 0) {
            $data = $data->where($where);
        }
        return $data->with(['user', 'shop.shopDetail'])->first();
    }

    public function changeStatus(RechargeHistory $rechargeHistory, $status)
    {
        $rechargeHistory->status = $status;
        $rechargeHistory->save();
        return $rechargeHistory;
    }
}
