<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Service\ServiceGroupCreateRequest;
use App\Http\Resources\Service\ServiceGroupListResource;
use App\Repository\Service\ServiceGroup\ServiceGroupInterface;
use Illuminate\Http\Request;

class ServiceGroupController extends Controller
{
    public function __construct(
        private ServiceGroupInterface $serviceGroupRepository,
    ) {
    }

    public function list()
    {
        return ServiceGroupListResource::collection($this->serviceGroupRepository->list(15));
    }

    public function getId($id)
    {
        return new ServiceGroupListResource($this->serviceGroupRepository->get($id));
    }

    public function delete($id)
    {
        try {
            $this->serviceGroupRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }

    public function upsert(ServiceGroupCreateRequest $request)
    {
        $validated = $request->validated();

        # UPLOAD IMAGE
        $image = uploadImageQueue($validated['image']);

        return $this->serviceGroupRepository->updateOrInsert($validated['id'], [
            "prioritize" => $validated['prioritize'],
            "name" => $validated['name'],
            "active" => $validated['active'],
            "image" => $image,
        ]);
    }
}
