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

    public function list(Request $request)
    {
        $name = $request->input('name');
        $id = $request->input('id');
        $providerId = $request->input('provider_id');
        $adminType = $request->input('admin_type');

        $filter = [];

        if ($name) {
            $filter['query'][] = ['name', 'like', "%$name%"];
        }
        if ($id) {
            $filter['query'][] = ['id', $id];
        }
        if ($adminType) {
            $filter['query'][] = ['admin_type', $adminType];
        }
        if ($providerId) {
            $filter['user_provider_id_filter'] = $providerId;
        }

        return AdminResource::collection($this->adminRepository->list(10, $filter));
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
        $password = $validated['password'] ?? null;

        if ($validated['provider_id']) $user = $this->userRepository->getByProviderId($validated['provider_id']);
        if ($validated['domain']) $shopList = $this->shopRepository->getByDomain($validated['domain']);

        $fillable = [
            "admin_type" => $validated['admin_type'],
            "name" => $validated['name'],
            "username" => $validated['username'],
            "block" => $validated['block'] ? 'on' : 'off',
            "active" => "on",
        ];

        if ($password) {
            $fillable = [...$fillable, "password" => $password ? Hash::make($password) : null];
        }

        $this->adminRepository->updateOrInsert(
            $validated['id'] ?? null,
            $fillable,
            user: $user ?? null,
            shopList: $shopList ?? null
        );
        return BaseResponse::msg("Thành công!");
    }
}
