<?php

namespace App\Http\Controllers\User;

use App\Helper\Crypto;
use App\Http\Controllers\{BaseResponse, Controller};
use App\Http\Requests\Auth\AuthLinkRequest;
use App\Http\Requests\User\{UserLoginRequest, UserRegisterRequest};
use App\Repository\Shop\ShopInterface;
use App\Repository\User\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(
        private UserInterface $userRepository,
        private ShopInterface $shopRepository
    ) {
    }

    public function getLinkLoginSocial(AuthLinkRequest $request)
    {
        $validated = $request->validated();

        switch ($validated['login_social']) {
            case "facebook":
                $url = "https://www.facebook.com/dialog/oauth?client_id=" . env('FACEBOOK_CLIENT_ID') . "&redirect_uri=" . env('FACEBOOK_CLIENT_CALLBACK') . "&scope=public_profile";
                break;
            case "tiktok":
                $csrfState = substr(str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789'), 0, 10);
                $url = 'https://www.tiktok.com/v2/auth/authorize/';
                $url .= "?client_key=" . "aw62aok9rdq9d1e0";
                $url .= '&scope=user.info.basic';
                $url .= '&response_type=code';
                $url .= '&redirect_uri=' . "https://login.s1.chinh.dev/tiktok.php";
                $url .= '&state=' . $csrfState;
                break;
        }

        return BaseResponse::data([
            "link" => $url
        ]);
    }

    public function getCurrentInfo(Request $request)
    {
        $user = $request->user();
        return BaseResponse::data([
            "providerId" => $user->provider_id,
            "name" => $user->name,
            "price" => $user->price_temporary,
            "diamond" => $user->diamond_temporary,
            "robux" => $user->robux_temporary,
            "created_at" => $user->created_at,
        ]);
    }

    private function generateProviderId()
    {
        do {
            $providerId = rand(1111111, 9999999) . time();
        } while (!$this->userRepository->exists([
            ['provider_id', $providerId],
            ['login_type', 'account']
        ]));
        return $providerId;
    }

    public function register(UserRegisterRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            $user = $this->userRepository->create([
                "login_type" => "account",
                "provider_id" => $this->generateProviderId(),
                "name" => $validated['username'],
                "username" => $validated['username'],
                "password" => Hash::make($validated['password'])
            ], shop: $this->shopRepository->getByDomain($validated['domain']));

            DB::commit();
            return BaseResponse::token(token: generateToken($user), msg: "Tạo tài thành công! Đang chuyển hướng...", status: 200);
        } catch (\Exception $e) {
            DB::rollBack();
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
            "login_type" => "account",
            // "block" => "off",
            // "active" => "on"
        ])) {
            return BaseResponse::msg("Mật khẩu không đúng! Hoặc chưa kích hoạt tài khoản! Vui lòng kiểm tra lại", 400);
        }

        $user = Auth::user();
        return BaseResponse::token(token: generateToken($user), msg: "Đăng nhập thành công!", status: 200);
    }
}
