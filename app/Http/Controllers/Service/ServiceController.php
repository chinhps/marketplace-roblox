<?php

namespace App\Http\Controllers\Service;

use App\Helper\RandomPercent;
use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\Service\ServiceDetailResource;
use App\Http\Resources\Service\ServiceListResource;
use App\Http\Resources\Service\ServicePlayResource;
use App\Models\Service;
use App\Models\ServiceDetail;
use App\Models\ServiceGift;
use App\Models\ServiceOdds;
use App\Repository\History\ServiceHistory\ServiceHistoryInterface;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Service\ServiceGroup\ServiceGroupInterface;
use App\Repository\Service\ServiceInterface;
use App\Repository\Transaction\TransactionInterface;
use App\Repository\User\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function __construct(
        private ServiceGroupInterface $serviceGroupRepository,
        private ServiceInterface $serviceRepository,
        private ServiceDetailInterface $serviceDetailRepository,
        private TransactionInterface $transactionRepository,
        private UserInterface $userRepository,
        private ServiceHistoryInterface $serviceHistoryRepository
    ) {
    }

    # Danh sách dịch vụ ở trang chủ
    public function serviceList(Request $request)
    {
        $domain = $request->domain;
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        return ServiceListResource::collection($this->serviceGroupRepository->serviceGroupList($idListAllow));
    }

    # Chi tiết dịch vụ
    public function serviceDetail($slug, Request $request)
    {
        $domain = $request->domain;
        # Kiểm tra service đó có tồn tại trong shop đang được gửi lên hay không
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        $service = $this->serviceDetailRepository->serviceDetail($slug, $idListAllow);
        if (!$service) {
            return BaseResponse::msg("Không tồn tại dịch vụ", 404);
        }
        # Trả về kết quả
        return new ServiceDetailResource($service);
    }

    /********
     * FLOW *
     * Get Slug at Url
     * Payload POST: "numrolllop","slug","domain"
     * 
     * Check Slug url === Slug payload(decode)
     * Check service at `Domain`
     * Get data `service`
     * Check `type service`: "WHEEL" | "LUCKYCARD" | "LUCKYBOX" -> Exception return false
     * Get odds service
     * 
     * - START TRANSACTION
     * 
     * Get price service * numloop = PRICE_SERVICE
     * Check free turn
     * Get turn by "price" current user
     * Minus price of current user
     * 
     * -*Priority loop free turn
     * Check Provider User with Provider Admin -> `USER PR`
     * Save to history service
     * 
     * + `USER PR` Unlimit Odds
     * + `USER DEFAULT` Select gift not vip
     * 
     * - END TRANSACTION
     * 
     ********/

    # Xử lý hành động quay(real)
    public function handelPlay(string $slug, Request $request)
    {

        $domain = $request->domain;
        $numrolllop = $request->numrolllop;

        # Check Slug url === Slug payload(decode)
        if ($slug !== $request->slug) return "payload khong dung";
        # Check service at `Domain`
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        # Get odds service
        $serviceDetail = $this->serviceDetailRepository->serviceDetail($slug, $idListAllow);
        if (!$serviceDetail) return "Khong ton tai service";

        # Check `type service`: "WHEEL" | "LUCKYCARD" | "LUCKYBOX" -> Exception return false
        if (!$serviceDetail->service->game_list->is_game) return "service khong dung";


        DB::beginTransaction();

        // ==============================================
        try {
            # Get price service * numloop = PRICE_SERVICE
            $priceService = $serviceDetail->service->price * $numrolllop;
            # Check turn
            $decrementTurn = false;
            # Check free turn
            $countFreeTurn = $this->serviceRepository->serviceTurn($serviceDetail->service, Auth::user()) ?? 0;
            if (floor($countFreeTurn / $numrolllop) >= 1) {
                # Minus `Price` or `Turn` of current user
                # *Priority loop free turn
                $decrementTurn = $this->serviceRepository->decrementTurn($serviceDetail->service, Auth::user(), $numrolllop);
                if (!$decrementTurn) {
                    DB::rollBack();
                    return "Khong the tru luot quay nen loi";
                }
            }
            # if not decrement turn then decrement price
            if (!$decrementTurn) {
                # Get turn by "price" current user
                $price = $this->transactionRepository->getPrice(Auth::user());
                if (floor($price / $priceService) >= 1) {
                    $decrementTurn = $this->transactionRepository->createPrice(
                        -$priceService,
                        "X$numrolllop, Sử dụng : {$serviceDetail->serviceImage->name}, #ID: {$serviceDetail->id}"
                    );
                    if (!$decrementTurn) {
                        DB::rollBack();
                        return "Khong the tru tien nen loi";
                    }
                }
            }
            // ERROR
            if (!$decrementTurn)  return "Khong du tien hoac luot quay";
        } catch (\Exception $e) {
            DB::rollBack();
            dd("lỗi hệ thống từ module trừ tiền");
        }
        // ==============================================

        // ==============================================
        try {
            /**
             * @var \App\Models\ServiceOdds
             */
            $serviceOdds = $this->serviceDetailRepository->serviceGifts($slug, $idListAllow)->serviceOdds;

            # ================= USER =================
            # Get all gift service of user
            /**
             * @var ['giftForUser' => Model ServiceGift, 'currentLoop' => float]
             */
            $giftAndCurrentLoopForUser = $this->getGiftAndCountLoopForUser($serviceOdds, $serviceDetail);
            # ================= END-USER =================


            # ================= ADMIN =================
            # $giftAndCurrentLoopForUser = $this->getGiftAndCountLoopForAdmin($serviceOdds, $serviceDetail);
            # ================= END-ADMIN =================

            /**
             * @var float
             */
            $currentLoop = $giftAndCurrentLoopForUser['currentLoop'];
            /**
             * @var \Illuminate\Database\Eloquent\Collection|\App\Models\ServiceGift[]
             */
            $giftForUser = $giftAndCurrentLoopForUser['giftForUser'];
        } catch (\Exception $e) {
            DB::rollBack();
            dd("lỗi hệ thống từ module lấy quà");
        }
        // ==============================================


        // ==============================================
        $gifts = [];
        $giftTotal = [];

        try {
            for ($i = 0; $i < $numrolllop; $i++) {

                # USER
                switch ($serviceOdds->odds_user_type) {
                    case "FIXED":
                        # Get list gift fixed
                        $listGiftFix = json_decode($serviceOdds->odds_user, true);
                        # if loop outside array "fixed" then set is 0(start)
                        if ($currentLoop >= count($listGiftFix)) $currentLoop = 0;
                        $currentLoop++;
                        $currentGift = $giftForUser->find($listGiftFix[$currentLoop]);
                        break;

                    case "RANDOM":
                        $createRandomGift = $giftForUser->map(function (ServiceGift $serviceGift) {
                            return ["value" => $serviceGift, 'percentage' => $serviceGift->percent_random];
                        });
                        $randomGift = RandomPercent::randomItemByPercentage($createRandomGift->toArray());
                        $currentGift = $randomGift['value'];
                        break;
                }

                # Get current gift
                $valueGift = ServiceHandle::handleGuardValueOdds($currentGift, $currentGift->gameCurrency->currency_key);
                # if error then rollback
                if (!$valueGift) {
                    DB::rollBack();
                    return "Phần thưởng đăng gặp vấn đề!";
                }

                # add gift to list
                $gifts[] = [
                    "id" => $currentGift->id,
                    "location" => 0,
                    "type" => $currentGift->gameCurrency->currency_key,
                    "type_name" => $currentGift->gameCurrency->currency_name,
                    "image" => $currentGift->image,
                    "msg" => "Chúc mừng bạn đã trúng $valueGift {$currentGift->gameCurrency->currency_name}",
                    "value" => $valueGift
                ];
                # add total
                $currencyKey = $currentGift->gameCurrency->currency_key;
                $currencyName = $currentGift->gameCurrency->currency_name;
                $giftTotal[$currencyKey] = [
                    "type" => $currencyKey,
                    "type_name" => $currencyName,
                    "value" => isset($giftTotal[$currencyKey]) ? $giftTotal[$currencyKey]['value'] + ($valueGift ?? 0) : ($valueGift ?? 0)
                ];
            }
        } catch (\Exception $e) {
            DB::rollBack();
            dd("lỗi hệ thống từ module xử lý nhận quà");
        }
        // ==============================================

        // ==============================================
        try {
            # Save to history service
            $serviceHistory = $this->serviceHistoryRepository->create(Auth::user(), $serviceDetail->service, $numrolllop, [
                "default" => "Tổng lượt quay: x$numrolllop | Tổng phần thưởng nhận được: X",
                "details" => collect($gifts)->map(function ($value) {
                    return [
                        "service_gift_id" => $value['id'],
                        "msg" => $value['msg']
                    ];
                })
            ]);
            # give gift to transaction
            collect($giftTotal)->each(function ($value) use ($serviceHistory, $serviceDetail) {
                ServiceHandle::handleGiveGiftByService(
                    transactionRepository: $this->transactionRepository,
                    idServiceHistory: $serviceHistory->id,
                    nameService: $serviceDetail->serviceImage->name,
                    currency: $value['type'],
                    value: $value['value']
                );
            });
        } catch (\Exception $e) {
            DB::rollBack();
            dd("lỗi hệ thống từ module tạo giao dịch và lịch sử");
        }
        // ==============================================

        DB::commit();
        $return = [];
        $return['giftTotal'] = $giftTotal;
        $return['gifts'] = $gifts;
        return new ServicePlayResource($return);
    }

    private function getGiftAndCountLoopForUser(ServiceOdds $serviceOdds, ServiceDetail $serviceDetail)
    {

        switch ($serviceOdds->odds_user_type) {
            case "FIXED":
                $listGiftFix = json_decode($serviceOdds->odds_user, true);
                # Get quantity used service in history
                $quantityHistory = $this->serviceHistoryRepository->getQuantityUserByService(Auth::user(), $serviceDetail->service);
                # Times count array "fixed" => position in array
                $currentLoop = $quantityHistory === 0 ? 0 : ($quantityHistory - 1) % count($listGiftFix);

                # Get all gift service of user
                $giftForUser = $this->serviceDetailRepository->giftForUserByListId($serviceOdds, $listGiftFix);
                break;

            case "RANDOM":
                # Get all gift service of user
                $giftForUser = $this->serviceDetailRepository->giftForUser($serviceOdds);
                $currentLoop = 0;
                break;
        }

        return ['giftForUser' => $giftForUser, 'currentLoop' => $currentLoop];
    }

    public function handelPlayTry()
    {
        return 123;
    }
}
