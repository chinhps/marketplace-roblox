<?php

namespace App\Http\Controllers\User;

use App\Helper\Crypto;
use App\Http\Controllers\{BaseResponse, Controller};
use App\Http\Requests\User\{UserLoginRequest};
use App\Repository\Histories\PurchaseHistory\PurchaseHistoryInterface;
use App\Repository\WithdrawPartner\WithdrawPartnerInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AuthController extends Controller
{

    public function __construct(
        private WithdrawPartnerInterface $withdrawPartnerRepository,
        private PurchaseHistoryInterface $purchaseHistoryRepository
    ) {}

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

    public function getCurrentInfo(Request $request)
    {
        $user = $request->user();
        if (Gate::allows('ctv', $user)) {
            $allAmount = $this->purchaseHistoryRepository->allAmountPartner($user);
            $currentAmount = $this->withdrawPartnerRepository->getCurrentAmount($user, $allAmount);
        }
        return BaseResponse::data([
            "id" => $user->id,
            "name" => $user->name,
            "shop" => $user->shop->domain ?? "",
            "admin_type" => $user->admin_type,
            "created_at" => $user->created_at,
            "price" => $currentAmount ?? null
        ]);
    }

    private function generateToken($user)
    {
        return Crypto::encrypt($user->createToken(env('APP_KEY'))->plainTextToken, env('APP_KEY'));
    }

    private function revokeToken($user)
    {
        return $user->tokens()->delete();
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
        ], $validated['remember'])) {
            return BaseResponse::msg("Mật khẩu không đúng! Hoặc chưa kích hoạt tài khoản! Vui lòng kiểm tra lại", 400);
        }

        $user = Auth::user();

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
