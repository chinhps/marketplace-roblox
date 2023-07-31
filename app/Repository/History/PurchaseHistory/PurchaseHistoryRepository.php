<?php

namespace App\Repository\History\PurchaseHistory;

use App\Models\AccountList;
use App\Models\Admin;
use App\Models\PurchaseHistory;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PurchaseHistoryRepository implements PurchaseHistoryInterface
{
    public function create(User $user, Admin $admin, AccountList $account)
    {
        $purchase = new PurchaseHistory;
        $purchase->user()->associate($user);
        $purchase->admin()->associate($admin);
        $purchase->account()->associate($account);
        $purchase->shop()->associate($user->shop);
        $purchase->refund = "NO";
        $purchase->price = $account->price;
        $purchase->detail_public = $account->detail_public;
        $purchase->detail_private = $account->detail_private;
        $purchase->save();
        return $purchase;
    }

    public function list()
    {
        return PurchaseHistory::where('user_id', Auth::user()->id)
            ->orderBy('id', 'desc')
            ->with(['account.service'])
            ->paginate(10);
    }
}
