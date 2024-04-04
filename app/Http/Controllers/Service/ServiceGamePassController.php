<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Service\ServiceGamePassRequest;
use App\Http\Resources\Service\ServiceEditResource;
use App\Repository\Game\GameCurrency\GameCurrencyInterface;
use App\Repository\Game\GameList\GameListInterface;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Service\ServiceGift\ServiceGiftInterface;
use App\Repository\Service\ServiceGroup\ServiceGroupInterface;
use App\Repository\Service\ServiceImage\ServiceImageInterface;
use App\Repository\Service\ServiceInterface;
use App\Repository\Service\ServiceOdds\ServiceOddsInterface;
use App\Repository\Shop\ShopInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ServiceGamePassController extends Controller
{

    public function __construct(
        private ServiceDetailInterface $serviceDetailRepository,
        private ServiceOddsInterface $serviceOddsRepository,
        private ServiceInterface $servicelRepository,
        private ServiceGroupInterface $servicelGroupRepository,
        private GameListInterface $gameListRepository,
        private ServiceImageInterface $serviceImageRepository,
        private ShopInterface $shopRepository,
        private ServiceGiftInterface $serviceGiftRepository,
        private GameCurrencyInterface $gameCurrencyRepository
    ) {
    }

    public function upsert(ServiceGamePassRequest $request)
    {
        $validated = $request->validated();

        # UPLOAD IMAGE THUMB
        $imageThumb = (is_string($validated['image'][0]) || $validated['image'][0] == null) ?
            $validated['image'][0] :
            uploadImageQueue($validated['image'][0]);

        DB::beginTransaction();

        try {
            # CREATE SERVICE IMAGE ##############################
            $dataServiceImage = [
                "name" => $validated["name_gamepass"],
                "thumb" => $imageThumb,
                "images" => "[]",
            ];
            $serviceImage = $this->serviceImageRepository->updateOrInsert(isset($validated['idServiceDetail']) ?
                $this->serviceDetailRepository->get(
                    $validated['idServiceDetail']
                )->service_image_id : null,  $dataServiceImage);

            $dataService = [
                "note" => $validated["name_gamepass"],
                "price" => 0,
                "excluding" => "OFF",
                "notification" => $validated["exemple"],
                "active" => $validated["active"],
                "sale" => 50,
                "information" => json_encode(['hastag' => "percent50"]),
                "service_key" => Str::random(15),
            ];
            # CREATE SERVICE ###################################
            $service = $this->servicelRepository->updateOrInsert(
                $validated['id'] ?? null,
                $dataService,
                gameCurrency: null,
                gameList: $this->gameListRepository->getByGameKey(
                    $validated['gamepass_image'] === "NO" ? "GAMEPASS" : "GAMEPASS_IMAGE"
                )
            );

            # CREATE ODDS SERVICE ############################
            $serviceOdds = $this->serviceOddsRepository->updateOrInsert($validated['idOdds'] ?? null, [
                "odds_admin_type" => "FIXED",
                "odds_user_type" => "FIXED",
                "odds_admin" => "[]",
                "odds_user" => "[]"
            ]);

            $parcels = explode("\n", $validated['parcels']);
            $gameCurrency = $this->gameCurrencyRepository->getByKey("NOT");

            # Get all id parcel post
            $parcelIds = [];
            # all current id parcels
            $parcelDiffIds = $this->serviceGiftRepository->list(0, [
                ["odds_id", $serviceOdds->id]
            ])->pluck("id");

            foreach ($parcels as $parcel) {
                $infoParcel = explode("|", $parcel);
                if (isset($infoParcel[3])) {
                    $parcelIds[] = (int)$infoParcel[3]; # add parcel id post
                }
                # CREATE GIFT SERVICE ###########################
                $this->serviceGiftRepository->updateOrInsert($infoParcel[3] ?? null, [
                    "gift_type" => "FIXED",
                    "vip" => "NO",
                    "image" => null,
                    "value1" => $infoParcel[1],
                    "value2" => 0,
                    "cost" => $infoParcel[2],
                    "percent_random" => null,
                    "text_custom" => $infoParcel[0]
                ], serviceOdds: $serviceOdds, gameCurrency: $gameCurrency);
            }

            # use array diff => delete id not found in parcels post
            $this->serviceGiftRepository->delete($parcelDiffIds->diff($parcelIds));

            /**
             * @var array
             */
            $domainsId = $this->shopRepository->getByListDomain($validated['dataExcept'] ?? [])->pluck('id')->toArray();
            # CREATE SERVICE DETAIL #########################
            $serviceDetail = $this->serviceDetailRepository->updateOrInsert(
                $validated['idServiceDetail'] ?? null,
                [
                    "prioritize" => 1,
                    "excluding" => $validated['except'] == 'true' ? "ON" : "OFF",
                    "slug" => Str::slug($validated["name_gamepass"])
                ],
                domainsId: $domainsId,
                service: $service,
                serviceGroup: $this->servicelGroupRepository->get($validated['idGroup']),
                serviceImage: $serviceImage,
                serviceOdds: $serviceOdds
            );

            DB::commit();
            return BaseResponse::data([
                "type" => (isset($validated['id']) ? "UPDATE" : "CREATE"),
                "msg" => (isset($validated['id']) ? "Cập nhật" : "Tạo mới") . " thành công Gamepass!",
                "id_odds" => $serviceOdds->id,
                "id_service_detail" => $serviceDetail->id
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Có lỗi: " . $e->getMessage(), 500);
        }
    }
}
