<?php

namespace App\Http\Controllers\Event;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Repository\Event\EventInterface;
use App\Repository\History\EventHistory\EventHistoryInterface;
use App\Repository\Transaction\TransactionInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{

    public function __construct(
        private EventInterface $eventRepository,
        private EventHistoryInterface $eventHistoryRepository,
        private TransactionInterface $transactionRepository
    ) {
    }

    public function getEventLast()
    {
        $event = $this->eventRepository->getLastEvent();
        $linkImage = $event->image ?? null;

        if (Auth::check()) {
            $check = $this->eventHistoryRepository->exists([
                ["user_id", Auth::id()],
                ["event_id", $event->id]
            ]);
            if ($check) {
                $linkImage = null;
            }
        }

        return BaseResponse::data([
            "image" => $linkImage,
        ]);
    }

    public function claim()
    {
        $event = $this->eventRepository->getLastEvent();

        try {
            $data = getValueJson($event->data_public);
            $getValueGift = explode("|", $data['value_gift']);
            $randomValueGift = rand($getValueGift[0], $getValueGift[1]);
        } catch (\Exception $e) {
            return BaseResponse::msg("Quà không tồn tại!", 413);
        }

        DB::beginTransaction();

        try {
            # CHECK CLAIMED
            $check = $this->eventHistoryRepository->exists([
                ["user_id", Auth::id()],
                ["event_id", $event->id]
            ]);

            if ($check) {
                DB::rollBack();
                return BaseResponse::msg("Bạn đã nhận quà này trước đó rồi!", 413);
            }

            switch ($data['gift']) {
                case "diamond":
                    $msg = "Chúc mừng bạn đã nhận được $randomValueGift Kim cương";
                    $this->transactionRepository->createDiamond($randomValueGift, "Nhận quà event #{$event->id}");
                    break;
                case "robux":
                    $msg = "Chúc mừng bạn đã nhận được $randomValueGift Robux";
                    $this->transactionRepository->createRobux($randomValueGift, "Nhận quà event #{$event->id}");
                    break;
                default:
                    return BaseResponse::msg("Phần quà không tồn tại!");
                    break;
            }

            $this->eventHistoryRepository->create(
                [
                    "gift" => $msg,
                ],
                event: $event,
                shop: Auth::user()->shop,
                user: Auth::user()
            );

            DB::commit();
            return BaseResponse::msg($msg);
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Có lỗi khi nhận phần quà!", 413);
        }
    }
}
