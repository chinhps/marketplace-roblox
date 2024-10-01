<?php

namespace App\Http\Controllers\User\LoginWith;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserLoginWithTokenRequest;
use App\Repository\Shop\ShopInterface;
use App\Repository\User\UserInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FacebookLoginController extends Controller
{
    public function __construct(
        private ShopInterface $shopRepository,
        private UserInterface $userRepository
    ) {
    }

    public function checkLogin(UserLoginWithTokenRequest $request)
    {
        $validated = $request->validated();
        $token = $validated['token'];

        try {
            $shop = $this->shopRepository->getByDomain($validated['domain']);
            $data = $this->infoUser($token);
            # info facebook
            $providerId = generateProviderSocial(
                'facebook',
                $data['id'],
                $shop
            );
            $name = $data['name'];
        } catch (\Exception $e) {
            return BaseResponse::msg("Token không chính xác!", 403);
        }

        DB::beginTransaction();
        try {
            $checkExists = $this->userRepository->getByConditions([
                ['provider_id', $providerId],
                ['login_type', 'facebook']
            ]);

            if ($checkExists) {
                Auth::login($checkExists, true);
                DB::commit();
                return BaseResponse::token(
                    token: generateToken($checkExists),
                    msg: "Đăng nhập thành công!!",
                    status: 200
                );
            }

            $user = $this->userRepository->create([
                "login_type" => "facebook",
                "provider_id" => $providerId,
                "name" => $name,
                "username" => Str::random(5) . Str::substr($providerId, 0, 7),
                "password" => "not found"
            ], shop: $shop);

            DB::commit();
            return BaseResponse::token(
                token: generateToken($user),
                msg: "Đăng nhập thành công!",
                status: 200
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg($e->getMessage(), 500);
        }
    }

    private function infoUser(string $token)
    {
        $response = Http::get("https://graph.facebook.com/v13.0/me?fields=id,name&access_token=$token");
        if ($response->successful()) {
            $userData = $response->json();
            return $userData;
        }
        throw new Exception("Token wrong");
    }
}
