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

    public function list(float $limit = 15)
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
        return $data->paginate($limit);
    }

    public function update(float $id, array $params)
    {
        return $this->model->find($id)->update($params);
    }
}
