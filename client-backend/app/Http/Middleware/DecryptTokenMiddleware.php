<?php

namespace App\Http\Middleware;

use App\Helper\Crypto;
use App\Http\Controllers\BaseResponse;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class DecryptTokenMiddleware extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        $token = str_replace('Bearer ', '', $request->header("Authorization"));
        $request->headers->set('Authorization', 'Bearer ' . Crypto::decrypt($token, env('APP_KEY')));
        $result = parent::handle($request, $next, ...$guards);

        $user = auth()->user();
        if ($user->block == "on") {
            $this->revokeToken($user);
            return BaseResponse::msg("Tài khoản đã bị chặn!", 451);
        }
        if ($user->active == "off") {
            $this->revokeToken($user);
            return BaseResponse::msg("Tài khoản của bạn chưa được kích hoạt!", 451);
        }

        if ($user->shop->domain != $request->domain) {
            $this->revokeToken($user);
            return BaseResponse::msg("Tài khoản của bạn không dùng được tại đây!", 451);
        }

        return $result;
    }

    private function revokeToken($user)
    {
        return $user->tokens()->delete();
    }
}
