<?php

namespace App\Repository\Account;

use App\Models\AccountList;

interface AccountInterface
{
    /**
     * @return \App\Models\AccountList
     */
    public function accountDetail(float $idAccount, array $idListAllow);
    public function recommend(array $idListAllow);
    public function accountDetailGame($idAccount);
    public function soldAccount(AccountList $account);
}
