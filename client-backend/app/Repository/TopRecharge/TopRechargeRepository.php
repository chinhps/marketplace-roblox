<?php

namespace App\Repository\TopRecharge;

use App\Models\TopRecharge;
use App\Models\TopRechargeVirtual;

class TopRechargeRepository implements TopRechargeInterface
{
    public function topRecharges(string $domain, string $month, string $year)
    {
        return TopRecharge::whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->orderBy('price', 'desc')
            ->limit(5)
            ->with(['shop', 'user'])
            ->whereHas('shop', function ($query) use ($domain) {
                $query->where('domain', $domain);
            })
            ->get();
    }

    public function topVirtualRecharges(string $domain, string $month, string $year)
    {
        return TopRechargeVirtual::whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->orderBy('price', 'desc')
            ->limit(5)
            ->with(['shop'])
            ->whereHas('shop', function ($query) use ($domain) {
                $query->where('domain', $domain);
            })
            ->get();
    }
}
