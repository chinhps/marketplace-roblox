<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\User\UserResource;
use App\Repository\User\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function __construct(
        private UserInterface $userRepository
    ) {
    }

    public function list(Request $request)
    {
        $name = $request->input('name');
        $id = $request->input('id');
        $provider_id = $request->input('provider_id');
        $sortPrice = $request->input('sortPrice');

        $filter = [];

        if ($name) {
            $filter['query'][] = ['name', 'like', "%$name%"];
        }
        if ($id) {
            $filter['query'][] = ['id', $id];
        }
        if ($provider_id) {
            $filter['query'][] = ['provider_id', 'like', "%$provider_id%"];
        }
        if ($sortPrice) {
            $filter['sort'][] = ['price_temporary', $sortPrice == 1 ? 'asc' : 'desc'];
        }
        return UserResource::collection($this->userRepository->list(15, $filter));
    }

    public function getId($id)
    {
        return new UserResource($this->userRepository->get($id));
    }

    public function blockUser($id, UserUpdateRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            $this->userRepository->update($id, [
                'block' => $validated['block'] ? "on" : "off"
            ]);
            DB::commit();
            return BaseResponse::msg("Cập nhật thành công");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Có lỗi khi cập nhật user!", 500);
        }
    }
}
