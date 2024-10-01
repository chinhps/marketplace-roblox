<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Service\ServiceGiftRequest;
use App\Repository\Service\ServiceGift\ServiceGiftInterface;
use Illuminate\Support\Facades\DB;

class ServiceGiftController extends Controller
{
    public function __construct(
        private ServiceGiftInterface $serviceGiftRepository
    ) {
    }

    public function upsert(ServiceGiftRequest $request)
    {
        $validated = $request->validated();
        try {
            DB::beginTransaction();
            # UPLOAD IMAGE THUMB
            foreach ($validated['gift'] as $key => $gift) {
                $thumb = $gift[0];
                $imageThumb = (is_string($thumb) || $thumb == null) ?
                    $thumb :
                    uploadImageQueue($thumb);

                $this->serviceGiftRepository->updateOrInsert($key, [
                    "image" => $imageThumb
                ]);
            }
            DB::commit();
            return BaseResponse::msg(
                "Cập nhật thành công " . count($validated['gift']) . " ảnh quà "
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Mọi thực hiện không được lưu, Có lỗi: " . $e->getMessage(), 500);
        }
    }
}
