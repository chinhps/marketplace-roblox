<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\{BaseResponse, Controller};
use App\Http\Requests\User\{UserLoginRequest, UserRegisterRequest};
use App\Repository\User\UserInterface;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(private UserInterface $userRepository)
    {
    }

    public function getCurrentInfo()
    {
        return Auth::user();
    }

    public function register(UserRegisterRequest $request)
    {
        $validated = $request->validated();
        return $this->userRepository->checkUniqueProviderId(123123123);
    }

    public function login(UserLoginRequest $request)
    {
        $validated = $request->validated();

        # Login Fail
        if (!Auth::attempt($validated)) {
            return BaseResponse::msg("Mật khẩu không đúng! Vui lòng kiểm tra lại", 400);
        }

        $user = Auth::user();

        # Different shop and login type isn't "account"
        if ($user->shop->domain !== app('domain') || $user->login_type !== "account") {
            return BaseResponse::msg("Tài khoản không tồn tại!", 400);
        }

        # Check Block account
        if ($user->block === "on") {
            return BaseResponse::msg("Tài khoản đã bị cấm!", 400);
        }

        # Check active account
        if ($user->active === "off") {
            return BaseResponse::msg("Tài khoản chưa được kích hoạt!", 400);
        }
        // @phpstan-ignore
        $token = $user->createToken("hello")->plainTextToken;
        return BaseResponse::token(token: $token, msg: "Đăng nhập thành công!", status: 200);
    }
}
