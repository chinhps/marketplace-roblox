<?php

namespace App\Repository\Histories\PurchaseHistory;

use App\Models\PurchaseHistory;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class PurchaseHistoryRepository implements PurchaseHistoryInterface
{
    public function __construct(
        private Model $model = new PurchaseHistory()
    ) {
    }

    public function list(float $limit = 15, array $filter = [])
    {
        $user = Auth::user();
        $data = $this->model->whereHas('admin', function (Builder $query) use ($user) {
            $query->where('id', $user->id);
        });
        if (Gate::allows('admin', $user)) {
            $data = $this->model;
        }
        if (Gate::allows('koc', $user)) {
            $data = $this->model->whereHas('shop', function (Builder $query) use ($user) {
                $query->where('id', $user->shop->id);
            });
        }
        $data = $data->with(['admin', 'shop', 'user']);
        $data = queryRepository($data, $filter);
        return $data->paginate($limit);
    }

    public function update(float $id, array $params)
    {
        $purchase = $this->model->findOrFail($id);
        return $purchase->update($params);
    }
}
