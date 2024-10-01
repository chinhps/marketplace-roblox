<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\EventCreateRequest;
use App\Http\Resources\Event\EventListResource;
use App\Repository\Event\EventInterface;
use Illuminate\Http\Request;

class EventController extends Controller
{

    public function __construct(
        private EventInterface $eventRepository
    ) {
    }

    public function list()
    {
        return EventListResource::collection($this->eventRepository->list(15));
    }

    public function getId($id)
    {
        return new EventListResource($this->eventRepository->get($id));
    }

    public function delete($id)
    {
        try {
            $this->eventRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }

    public function upsert(EventCreateRequest $request)
    {
        $validated = $request->validated();

        # UPLOAD IMAGE
        $image = uploadImageQueue($validated['images'][0]);

        $this->eventRepository->updateOrInsert($validated['id'], [
            "name" => $validated['name'],
            "image" => $image,
            "active" => $validated['active'] == "true" ? "ON" : "OFF",
            "form_public" => "[]",
            "data_public" => json_encode([
                [
                    "key" => "value_gift",
                    "name" => "Nhận quà cho người mới",
                    "value" => $validated['value_gift']
                ],
                [
                    "key" => "gift",
                    "name" => "Loại quà nhận được",
                    "value" => $validated['gift']
                ]
            ])
        ]);

        $msg = "Đã tạo thành công";
        if ($validated['id']) {
            $msg = "Cập nhật thành công!";
        }
        return BaseResponse::msg("$msg");
    }
}
