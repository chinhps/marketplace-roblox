<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return BaseResponse::data([
                "msg" => "Đăng xuất thành công!"
            ]);
        } catch (\Exception) {
            return BaseResponse::data([
                "msg" => "Đăng xuất thất bại!"
            ], 500);
        }
    }

    public function logoutAll(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            return BaseResponse::data([
                "msg" => "Đăng xuất thành công!"
            ]);
        } catch (\Exception) {
            return BaseResponse::data([
                "msg" => "Đăng xuất thất bại!"
            ], 500);
        }
    }
}
