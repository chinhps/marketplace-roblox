<?php

namespace App\Http\Controllers\WithdrawLimit;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\WithdrawLimit\WithdrawLimitRequest;
use App\Http\Resources\WithdrawLimit\WithdrawLimitResource;
use App\Repository\User\UserInterface;
use App\Repository\WithdrawLimit\WithdrawLimitInterface;
use App\Repository\WithdrawType\WithdrawTypeInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WithdrawLimitController extends Controller
{

    public function __construct(
        private WithdrawLimitInterface $withdrawLimitRepository,
        private UserInterface $userRepository,
        private WithdrawTypeInterface $withdrawTypeRepository
    ) {
    }

    public function list(Request $request)
    {
        $domain = $request->input('domain');
        $name = $request->input('username');
        $providerId = $request->input('provider_id');
        $sortId = $request->input('sort_id');

        $filter = [];
        if ($providerId) {
            $filter['user_provider_id_filter'] = $providerId;
        }
        if ($domain) {
            $filter['shop_user_filter'] = $domain;
        }
        if ($name) {
            $filter['user_filter'] = $name;
        }
        if ($sortId) {
            $filter['sort'][] = ['id', $sortId == 1 ? 'asc' : 'desc'];
        }
        return WithdrawLimitResource::collection($this->withdrawLimitRepository->list(15, $filter));
    }

    public function getId($id)
    {
        return new WithdrawLimitResource($this->withdrawLimitRepository->get($id));
    }

    public function delete($id)
    {
        try {
            $this->withdrawLimitRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }

    public function upsert(WithdrawLimitRequest $request)
    {
        $validated = $request->validated();

        $user = $this->userRepository->getByProviderId($validated['provider_id']);
        $withdrawType = $this->withdrawTypeRepository->get($validated['withdraw_type']);

        try {

            DB::beginTransaction();
            $this->withdrawLimitRepository->updateOrInsert($validated['id'] ?? null, [
                "withdraw_limit" => $validated['limit'],
                "active" => $validated['active']
            ], user: $user, withdrawType: $withdrawType);

            DB::commit();
            return BaseResponse::msg("Thành công!", 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg($e->getMessage(), 500);
        }
    }
}
