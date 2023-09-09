<?php

namespace App\Repository\Account;

use App\Models\AccountList;
use App\Models\Admin;
use App\Models\Service;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AccountRepository implements AccountInterface
{
    public function __construct(
        private Model $model = new AccountList()
    ) {
    }

    public function list(float $limit = 15)
    {
        $user = Auth::user();
        $data = $this->model->whereHas('admin', function (Builder $query) use ($user) {
            $query->where('id', $user->id);
        });
        if (Gate::allows('admin', $user)) {
            $data = $this->model;
        }
        return $data->paginate($limit);
    }

    public function get(float $id)
    {
        $user = Auth::user();
        $account = $this->model->findOrFail($id);
        if (Gate::allows('admin', $user) || $account->admin_id === $user->id) {
            return $account;
        }
        throw new Exception("Bạn không có quyền xem tài khoản!");
    }

    public function delete(float $id)
    {
        $user = Auth::user();
        $account = $this->model->findOrFail($id);
        if ($account->status === 'SOLD') {
            throw new Exception("Tài khoản đã bán không thể xóa");
        }
        if (Gate::allows('admin', $user) || $account->admin_id === $user->id) {
            return $account->delete();
        }
        throw new Exception("Bạn không có quyền xóa tài khoản!");
    }

    public function updateOrInsert(float|null $id, array $params, Admin $admin, Service $service)
    {
        if ($id) $data = $this->model->find($id);
        if (!$id) $data = new AccountList();

        $data->service()->associate($service);
        $data->admin()->associate($admin);
        $data->fill($params);
        $data->save();

        return $data;
    }
}
