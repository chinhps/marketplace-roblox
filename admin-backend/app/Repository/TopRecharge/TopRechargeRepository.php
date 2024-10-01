<?php

namespace App\Repository\TopRecharge;

use App\Models\ShopList;
use App\Models\TopRecharge;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class TopRechargeRepository implements TopRechargeInterface
{
    public function __construct(
        private Model $model = new TopRecharge()
    ) {
    }

    public function list(float $limit = 15, array $filter = [])
    {
        $data = $this->model->with(['user', 'shop']);
        $data = queryRepository($data, $filter);
        return $data->paginate($limit);
    }

    public function delete(float $id)
    {
        return $this->model->find($id)->delete();
    }

    public function topRecharges(string $domain, string $month, string $year)
    {
        return TopRecharge::whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->orderBy('price', 'desc')
            ->with(['shop', 'user'])
            ->whereHas('shop', function ($query) use ($domain) {
                $query->where('domain', $domain);
            })
            ->get();
    }

    public function exists(array $conditions = [], $month, $year)
    {
        return TopRecharge::where($conditions)
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->first();
    }

    public function updateOrCreate(float|null $id, float $price, User $user, ShopList $shop)
    {
        if (!$id) {
            $topRecharge = new TopRecharge();
            $topRecharge->user()->associate($user);
            $topRecharge->shop()->associate($shop);
            $topRecharge->price = $price;
        }
        if ($id) {
            $topRecharge = TopRecharge::find($id);
            $topRecharge->price += $price;
        }
        $topRecharge->save();
        return $topRecharge;
    }
}
