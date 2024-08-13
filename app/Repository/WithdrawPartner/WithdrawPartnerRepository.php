<?php

namespace App\Repository\WithdrawPartner;

use App\Models\Admin;
use App\Models\WithdrawPartner;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class WithdrawPartnerRepository implements WithdrawPartnerInterface
{
    public function __construct(
        private Model $model = new WithdrawPartner()
    ) {}

    public function getCurrentAmount(Admin $admin, float $amount)
    {
        $amountWithdrawed = $this->model->where('admin_id', $admin->id)
            ->whereIn('status', ['PENDING', 'SUCCESS'])->sum('amount');
        return $amount - $amountWithdrawed;
    }

    public function list(float $limit = 15, array $filter = [])
    {
        $data = $this->model->with(["admin"]);
        $user = Auth::user();
        if (Gate::allows('ctv', $user)) {
            $data = $data->where('admin_id', $user->id);
        }
        $data = queryRepository($data, $filter);
        return $data->paginate($limit);
    }

    public function updateOrInsert(float|null $id, array $params, Admin $admin)
    {
        $data = new WithdrawPartner();
        if (Gate::allows('admin', $admin)) {
            if ($id) {
                $data = $this->model->find($id);
                if ($data->status != "PENDING") {
                    throw new Exception("Giao dịch này đã được trả lệnh từ trước");
                }
                $data->update($params);
                $data->save();
                return $data;
            }
        }
        if (Gate::allows('ctv', $admin)) {
            $data->fill($params);
            $data->admin()->associate($admin);
            $data->save();
        }
        return $data;
    }
}
