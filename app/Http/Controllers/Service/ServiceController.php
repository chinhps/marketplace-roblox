<?php

namespace App\Http\Controllers\Service;

use App\Helper\RandomPercent;
use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\DomainRequest;
use App\Http\Requests\Service\ServiceFilterRequest;
use App\Http\Requests\Service\ServicePlayRequest;
use App\Http\Resources\Service\ServiceAccountDetailResource;
use App\Http\Resources\Service\ServiceAccountListResource;
use App\Http\Resources\Service\ServiceDetailResource;
use App\Http\Resources\Service\ServiceListResource;
use App\Http\Resources\Service\ServicePlayResource;
use App\Http\Resources\Service\ServiceResource;
use App\Models\ServiceDetail;
use App\Models\ServiceGift;
use App\Models\ServiceOdds;
use App\Repository\Account\AccountInterface;
use App\Repository\History\ServiceHistory\ServiceHistoryInterface;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Service\ServiceGroup\ServiceGroupInterface;
use App\Repository\Service\ServiceInterface;
use App\Repository\Transaction\TransactionInterface;
use App\Repository\User\UserInterface;
use Exception;
use Illuminate\Support\Collection;
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
        private ServiceHistoryInterface $serviceHistoryRepository,
        private AccountInterface $accountRepository
    ) {
    }

    public function recommendsService($slug, DomainRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];
        # Check service exists at domain
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        $serviceDetail = $this->serviceDetailRepository->serviceDetail($slug, $idListAllow);
        return ServiceResource::collection($this->serviceDetailRepository->simalarServices($serviceDetail, $idListAllow));
    }

    # Get list service at home
    public function serviceList(DomainRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        return ServiceListResource::collection($this->serviceGroupRepository->serviceGroupList($idListAllow));
    }

    public function serviceDetailAccountList($slug, ServiceFilterRequest $request)
    {
        /**
         * @var array ['id','price','sort']
         */
        $filter = $request->validated();
        $domain = $request->domain;
        # Check service exists at domain
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        $serviceDetail = $this->serviceDetailRepository->serviceDetailHaveAccounts($slug, $idListAllow, $filter);
        if (!$serviceDetail) {
            return BaseResponse::msg("Không tồn tại dịch vụ", 404);
        }
        # Check `type service`: "BOX" | "RANDOM" | "ACCOUNT" -> Exception return false
        $checkKeyService = ServiceHandle::isServiceHaveAccounts($serviceDetail->service->game_list->game_key);
        if (!$checkKeyService) {
            return BaseResponse::msg("Dịch vụ không thể sử dụng", 404);
        }
        return ServiceAccountListResource::collection($serviceDetail->service->accounts);
    }

    # Service Detail
    public function serviceDetail($slug, DomainRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];
        # Check service exists at domain
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        $service = $this->serviceDetailRepository->serviceDetail($slug, $idListAllow);
        if (!$service) {
            return BaseResponse::msg("Không tồn tại dịch vụ", 404);
        }
        # Return response
        if ($service->service_odds_id) {
            return new ServiceDetailResource($service);
        }
        return new ServiceAccountDetailResource($service);
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

    # handle Play(real)
    public function handlePlay(string $slug, ServicePlayRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];
        $numrolllop = ServiceHandle::CheckNumLoop($validated['numrolllop']);
        $slugPayload = $validated['slug'];

        try {
            # Check service at `Domain`
            $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
            $serviceDetail = $this->checkService(
                slug: $slug,
                slugPayload: $slugPayload,
                idListAllow: $idListAllow,
            );
        } catch (\Exception $e) {
            return BaseResponse::msg($e->getMessage(), 404);
        }

        DB::beginTransaction();

        // ======= CHECK TURN OR PRICE & MINUS IT ======
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
                    return BaseResponse::msg("Không thể trừ lượt quay! Liên hệ admin nếu còn lặp lại!", 402);
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
                        return BaseResponse::msg("Không thể trừ tiền! Liên hệ admin nếu còn lặp lại!", 402);
                    }
                }
            }
            // ERROR
            if (!$decrementTurn)  return BaseResponse::msg("Bạn không đủ tiền hoặc không có lượt quay!", 402);
        } catch (\Exception $e) {
            DB::rollBack();
            logReport('error_service', "lỗi hệ thống từ module trừ tiền", $e);
            return BaseResponse::msg("Có lỗi đã xảy ra khi trừ tiền! Vui lòng liên hệ Admin!", 402);
        }
        // ==============================================

        // ========== GET ALL GIFT BY SERVICE ===========
        try {
            /**
             * @var \App\Models\ServiceOdds
             */
            $serviceOdds = $this->serviceDetailRepository->serviceGifts($slug, $idListAllow)->serviceOdds;

            # ================= USER =================
            /**
             * Get all gift service of user
             * @var ['giftForUser' => Model ServiceGift, 'currentLoop' => float]
             */
            $giftAndCurrentLoopForUser = $this->getGiftAndCountLoopForUser($serviceOdds, $serviceDetail);
            # ================= END-USER =================

            # ================= ADMIN =================
            /**
             * Get all gift service of user
             * @var ['giftForUser' => Model ServiceGift, 'currentLoop' => float]
             */
            if (Auth::user()->admin) {
                $giftAndCurrentLoopForUser = $this->getGiftAndCountLoopForAdmin($serviceOdds, $serviceDetail);
            }
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
            logReport('error_service', "lỗi hệ thống từ module lấy quà", $e);
            return BaseResponse::msg("Có lỗi khi lấy quà trong kho! Vui lòng liên hệ admin!", 402);
        }
        // ==============================================


        // ============= handle LOOP GIFT ===============
        try {
            $handleGiftWithLoop = $this->handleGiftWithLoop(
                numrolllop: $numrolllop,
                serviceOdds: $serviceOdds,
                giftForUser: $giftForUser,
                currentLoopLocal: $currentLoop,
                checkGuard: true
            );
            if (!$handleGiftWithLoop) {
                DB::rollBack();
                return BaseResponse::msg("Phần thưởng đăng gặp vấn đề!", 404);
            }
            $gifts = $handleGiftWithLoop['gifts'];
            $giftTotal = $handleGiftWithLoop['giftTotal'];
        } catch (\Exception $e) {
            DB::rollBack();
            logReport('error_service', "lỗi hệ thống từ module xử lý nhận quà", $e);
            return BaseResponse::msg("Có lỗi khi trao quà! Vui lòng liên hệ admin!", 402);
        }
        // ==============================================

        // ======== SAVE TO HISTORY & TRANSACTION ========
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
                $note = json_encode([
                    "nameService" => $serviceDetail->serviceImage->name,
                    "history_service_id" => $serviceHistory->id
                ]);
                ServiceHandle::handleGiveGiftByService(
                    transactionRepository: $this->transactionRepository,
                    currency: $value['type'],
                    value: $value['value'],
                    note: $note
                );
            });
        } catch (\Exception $e) {
            DB::rollBack();
            logReport('error_service', "lỗi hệ thống từ module tạo giao dịch và lịch sử", $e);
            return BaseResponse::msg("Không thể tạo giao dịch! Vui lòng liên hệ admin!", 402);
        }
        // ==============================================

        DB::commit();
        $return = [];
        $return['price'] = $priceService;
        $return['giftTotal'] = $giftTotal;
        $return['gifts'] = $gifts;
        return new ServicePlayResource($return);
    }

    public function handlePlayTry(string $slug, ServicePlayRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];
        $numrolllop = ServiceHandle::CheckNumLoop($validated['numrolllop']);
        $slugPayload = $validated['slug'];

        try {
            # Check service at `Domain`
            $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
            $this->checkService(
                slug: $slug,
                slugPayload: $slugPayload,
                idListAllow: $idListAllow,
            );
        } catch (\Exception $e) {
            return BaseResponse::msg($e->getMessage(), 404);
        }
        // ========== GET ALL GIFT BY SERVICE ===========
        /**
         * @var \App\Models\ServiceOdds
         */
        $serviceOdds = $this->serviceDetailRepository->serviceGifts($slug, $idListAllow)->serviceOdds;
        $giftForAdmin = $this->serviceDetailRepository->giftForAdmin($serviceOdds);
        // ==============================================

        // ============= handle LOOP GIFT ===============
        $handleGiftWithLoop = $this->handleGiftWithLoop(
            numrolllop: $numrolllop,
            serviceOdds: $serviceOdds,
            giftForUser: $giftForAdmin,
            currentLoopLocal: 0,
            checkGuard: false
        );
        $gifts = $handleGiftWithLoop['gifts'];
        $giftTotal = $handleGiftWithLoop['giftTotal'];
        // ==============================================

        $return = [];
        $return['price'] = 0;
        $return['giftTotal'] = $giftTotal;
        $return['gifts'] = $gifts;
        return new ServicePlayResource($return);
    }

    /**
     * checkService
     *
     * @param  string $slug
     * @param  string $slugPayload
     * @param  array $idListAllow
     * @return ServiceDetail|Exception
     */
    private function checkService(string $slug, string $slugPayload, array $idListAllow)
    {
        # Check Slug url === Slug payload(decode)
        if ($slug !== $slugPayload) throw new Exception("incorrect playload");
        //return BaseResponse::msg("incorrect playload", 404);
        # Get odds service
        $serviceDetail = $this->serviceDetailRepository->serviceDetail($slug, $idListAllow);
        if (!$serviceDetail) throw new Exception("Không tồn tại dịch vụ");
        // return BaseResponse::msg("Không tồn tại dịch vụ", 404);

        # Check `type service`: "WHEEL" | "LUCKYCARD" | "LUCKYBOX" -> Exception return false
        if (!$serviceDetail->service->game_list->is_game) throw new Exception("Dịch vụ không thể sử dụng");
        // return BaseResponse::msg("Dịch vụ không thể sử dụng", 404);
        return $serviceDetail;
    }

    /**
     * handleGiftWithLoop
     * handle loop gift, check value and return gifts + total gifts
     *
     * @param  float $numrolllop
     * @param  ServiceOdds $serviceOdds
     * @param  Collection $giftForUser
     * @param  float $currentLoopLocal ONLY TYPE "FIXED"
     * @param  bool $checkGuard Filter quality gift
     * @return array|false
     * In array:
     * "gifts": Array have all gift
     * "giftTotal": Array - total gift
     */
    private function handleGiftWithLoop(
        float $numrolllop,
        ServiceOdds $serviceOdds,
        Collection $giftForUser,
        float $currentLoopLocal,
        bool $checkGuard
    ) {
        $gifts = [];
        $giftTotal = [];
        $currentLoop = $currentLoopLocal;
        for ($i = 0; $i < $numrolllop; $i++) {
            # ONLY USER
            if ($checkGuard) {
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
            }

            # ADMIN OR GHOST
            if (!$checkGuard) {
                $currentGift = $giftForUser->random();
            }

            if (!$currentGift) {
                # report admin
                throw new Exception("Quà không tồn tại, service odds: {$serviceOdds->id}");
            }

            $valueGift = ServiceHandle::giftType(
                giftType: $currentGift->gift_type,
                value1: $currentGift->value1,
                value2: $currentGift->value2
            );

            # Check quality gift
            if ($checkGuard) {
                # Get current gift
                $valueGift = ServiceHandle::handleGuardValueOdds($currentGift, $currentGift->gameCurrency->currency_key);
                # if error then rollback
                if (!$valueGift) {
                    # report admin
                    return false; //"Phần thưởng đăng gặp vấn đề!";
                }
            }

            # add gift to list
            $gifts[] = [
                "id" => $currentGift->id,
                "location" => 0,
                "type" => $currentGift->gameCurrency->currency_key,
                "type_name" => $currentGift->gameCurrency->currency_name,
                "image" => $currentGift->image,
                "msg" => "Trúng $valueGift {$currentGift->gameCurrency->currency_name}",
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

        return [
            "gifts" => $gifts,
            "giftTotal" => $giftTotal
        ];
    }

    private function getGiftAndCountLoopForAdmin(ServiceOdds $serviceOdds, ServiceDetail $serviceDetail)
    {
        switch ($serviceOdds->odds_admin_type) {
            case "FIXED":
                $listGiftFix = json_decode($serviceOdds->odds_admin, true);
                # Get quantity used service in history
                $quantityHistory = $this->serviceHistoryRepository->getQuantityUserByService(Auth::user(), $serviceDetail->service);
                # Times count array "fixed" => position in array
                $currentLoop = $quantityHistory === 0 ? 0 : ($quantityHistory - 1) % count($listGiftFix);

                # Get all gift service of user
                $giftForUser = $this->serviceDetailRepository->giftForAdminByListId($serviceOdds, $listGiftFix);
                break;

            case "RANDOM":
                # Get all gift service of user
                $giftForUser = $this->serviceDetailRepository->giftForAdmin($serviceOdds);
                $currentLoop = 0;
                break;
        }

        return ['giftForUser' => $giftForUser, 'currentLoop' => $currentLoop];
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
}
