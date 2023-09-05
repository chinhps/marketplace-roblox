<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminCreateRequest;
use App\Http\Resources\Admin\AdminResource;
use App\Repository\Admin\AdminInterface;
use App\Repository\Shop\ShopInterface;
use App\Repository\User\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function __construct(
        private AdminInterface $adminRepository,
        private UserInterface $userRepository,
        private ShopInterface $shopRepository,
    ) {
    }

    public function list()
    {
        return AdminResource::collection($this->adminRepository->list(15));
    }

    public function getId($id)
    {
        return new AdminResource($this->adminRepository->get($id));
    }

    public function delete($id)
    {
        try {
            $this->adminRepository->delete($id);
            # REMOVE ALL TRASACTION 
            return BaseResponse::msg("Xóa thành công! Các tài khoản Pr sẽ tự động bị hạ thành thành viên thường", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }

    public function upsert(AdminCreateRequest $request)
    {
        $validated = $request->validated();

        if ($validated['user_id']) $user = $this->userRepository->get($validated['user_id']);
        if ($validated['shop_id']) $shopList = $this->shopRepository->get($validated['shop_id']);

        $data = $this->adminRepository->updateOrInsert(
            $validated['id'],
            [
                "admin_type" => $validated['admin_type'],
                "name" => $validated['name'],
                "username" => $validated['username'],
                "password" => Hash::make($validated['password']),
                "block" => $validated['block'] ? "on" : 'off',
                "active" => $validated['active'] ? "on" : 'off',
            ],
            user: $user ?? null,
            shopList: $shopList ?? null
        );
        return $data;
    }
}
