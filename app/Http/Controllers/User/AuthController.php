<?php

namespace App\Http\Controllers\User;

use App\Helper\Crypto;
use App\Http\Controllers\{BaseResponse, Controller};
use App\Http\Requests\User\{UserLoginRequest, UserRegisterRequest};
use App\Repository\Shop\ShopInterface;
use App\Repository\User\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(
        private UserInterface $userRepository,
        private ShopInterface $shopRepository
    ) {
    }

    public function getCurrentInfo(Request $request)
    {
        $user = $request->user();
        return BaseResponse::data([
            "providerId" => $user->provider_id,
            "name" => $user->name,
            "price" => $user->price_temporary,
            "diamond" => $user->diamond_temporary,
            "robux" => 0,
            "created_at" => $user->created_at,
        ]);
    }

    private function generateProviderId()
    {
        do {
            $providerId = rand(1111111, 9999999) . time();
        } while (!$this->userRepository->checkUniqueProviderId($providerId));
        return $providerId;
    }

    private function generateToken($user)
    {
        return Crypto::encrypt($user->createToken(env('APP_KEY'))->plainTextToken, env('APP_KEY'));
    }

    private function revokeToken($user)
    {
        return $user->tokens()->delete();
    }


    public function register(UserRegisterRequest $request)
    {
        $validated = $request->validated();

        try {
            $user = $this->userRepository->create([
                "shop_id" => $this->shopRepository->shopId($validated['domain']),
                "login_type" => "account",
                "provider_id" => $this->generateProviderId(),
                "name" => $validated['username'],
                "username" => $validated['username'],
                "password" => Hash::make($validated['password'])
            ]);
            if (!$user) throw new \Exception("Có lỗi nào đấy khiến không thể tạo tài khoản");

            return BaseResponse::token(token: $this->generateToken($user), msg: "Tạo tài thành công! Đang chuyển hướng...", status: 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Tạo tài khoản thất bại! Liên hệ admin để được hỗ trợ", 500);
        }
    }

    public function login(UserLoginRequest $request)
    {
        $validated = $request->validated();

        # Login Fail
        if (!Auth::attempt([
            "username" => $validated['username'],
            "password" => $validated['password'],
            "block" => "off",
            "active" => "on"
        ])) {
            return BaseResponse::msg("Mật khẩu không đúng! Hoặc chưa kích hoạt tài khoản! Vui lòng kiểm tra lại", 400);
        }

        $user = Auth::user();

        # Different shop and login type isn't "account"
        if ($user->shop->domain !== $validated['domain'] || $user->login_type !== "account") {
            $this->revokeToken($user);
            return BaseResponse::msg("Tài khoản không tồn tại!", 400);
        }

        # Check Block account
        if ($user->block === "on") {
            $this->revokeToken($user);
            return BaseResponse::msg("Tài khoản đã bị cấm!", 400);
        }

        # Check active account
        if ($user->active === "off") {
            $this->revokeToken($user);
            return BaseResponse::msg("Tài khoản chưa được kích hoạt!", 400);
        }

        return BaseResponse::token(token: $this->generateToken($user), msg: "Đăng nhập thành công!", status: 200);
    }
}
