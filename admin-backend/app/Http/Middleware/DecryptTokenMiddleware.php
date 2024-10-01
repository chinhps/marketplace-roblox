<?php

namespace App\Http\Middleware;

use App\Helper\Crypto;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class DecryptTokenMiddleware extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        $token = str_replace('Bearer ', '', $request->header("Authorization"));
        $request->headers->set('Authorization', 'Bearer ' . Crypto::decrypt($token, env('APP_KEY')));
        return parent::handle($request, $next, ...$guards);
    }
}
