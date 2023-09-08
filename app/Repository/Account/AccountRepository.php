<?php

namespace App\Repository\Account;

use App\Models\AccountList;
use App\Models\Admin;
use App\Models\Service;
use Illuminate\Database\Eloquent\Model;

class AccountRepository implements AccountInterface
{
    public function __construct(
        private Model $model = new AccountList()
    ) {
    }

    public function list(float $limit = 15)
    {
        return $this->model->paginate($limit);
    }

    public function get(float $id)
    {
        return $this->model->find($id);
    }

    public function delete(float $id)
    {
        return $this->model->find($id)->delete();
    }

    public function updateOrInsert(float|null $id, array $params, Admin $admin, Service $service)
    {
    }
}
