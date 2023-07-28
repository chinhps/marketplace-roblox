<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Requests\DomainRequest;
use Illuminate\Http\Request;

class ShopDetailController extends Controller
{
    public function infomationShop(DomainRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];

        

    }
}
