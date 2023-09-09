<?php

namespace App\Repository\Histories\ServiceHistory;

use App\Models\ServiceHistory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ServiceHistoryRepository implements ServiceHistoryInterface
{
    public function __construct(
        private Model $model = new ServiceHistory()
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
        return $data->with(['service', 'user', 'shop'])->paginate($limit);
    }

    public function updateOrInsert(float|null $id, array $params)
    {
    }
}
