<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Http\Requests\Service\ServiceForAllCreateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ServiceForAllController extends Controller
{
    public function upsert(ServiceForAllCreateRequest $request)
    {
        $validated = $request->validated();
        
        # UPLOAD IMAGE

        return dd($validated);
    }
}
