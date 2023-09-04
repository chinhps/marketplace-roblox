<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Http\Requests\Service\ServiceForAllCreateRequest;
use App\Jobs\UploadFileAPI;
use App\Repository\Game\GameCurrency\GameCurrencyInterface;
use App\Repository\Game\GameList\GameListInterface;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Service\ServiceGift\ServiceGiftInterface;
use App\Repository\Service\ServiceGroup\ServiceGroupInterface;
use App\Repository\Service\ServiceImage\ServiceImageInterface;
use App\Repository\Service\ServiceInterface;
use App\Repository\Service\ServiceOdds\ServiceOddsInterface;
use App\Repository\Shop\ShopInterface;
use Illuminate\Support\Str;

class ServiceForAllController extends Controller
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

    public function upsert(ServiceForAllCreateRequest $request)
    {
        $validated = $request->validated();

        $imagesDetail = [];

        foreach ($validated['dataForm'] as $key => $value) {
            if (strpos($key, 'image_') !== false) {
                # UPLOAD IMAGE
                $dataImageDetail = uploadImageQueue($value[0]);
                $imagesDetail[] = $dataImageDetail;
            }
        }

        # CREATE IMAGE
        # UPLOAD IMAGE THUMB
        $imageThumb = uploadImageQueue($validated['dataForm']['thumb_service_image'][0]);

        $dataServiceImage = [
            "name" => $validated["dataForm"]['name_service_image'],
            "thumb" => $imageThumb,
            "images" => json_encode([
                "image_1" => ($imagesDetail[0]) ?? null,
                "image_2" => ($imagesDetail[1]) ?? null,
                "image_3" => ($imagesDetail[2]) ?? null,
                "image_4" => ($imagesDetail[3]) ?? null,
                "image_5" => ($imagesDetail[4]) ?? null,
            ]),
        ];

        $serviceImage = $this->serviceImageRepository->updateOrInsert(null,  $dataServiceImage);

        # CREATE SERVICE
        $dataService = [
            "note" => $validated["dataForm"]['note_service'],
            "price" => $validated["dataForm"]['price_service'],
            "excluding" => "OFF",
            "notification" => $validated["dataForm"]['notification_service'],
            "active" => $validated["dataForm"]['active_service'],
            "sale" => $validated["dataForm"]["sale_service"],
            "information" => '{ "hastag": "percent80" }',
            "service_key" => Str::random(15),
        ];
        $service = $this->servicelRepository->updateOrInsert(
            null,
            $dataService,
            gameCurrency: null,
            gameList: $this->gameListRepository->getByGameKey($validated['typeService'])
        );

        /**
         * @var array
         */
        $domainsId = $this->shopRepository->getByListDomain($validated['dataExcept'])->pluck('id')->toArray();

        if (!is_null($validated['dataOdds'])) {
            # CREATE ODDS
            $serviceOdds = $this->serviceOddsRepository->updateOrInsert(null, [
                "odds_admin_type" => $validated["dataOdds"]["isRandomAdmin"] ? "RANDOM" : "FIXED",
                "odds_user_type" => $validated["dataOdds"]["isRandomUser"] ? "RANDOM" : "FIXED",
                "odds_admin" => "[]",
                "odds_user" => "[]"
            ]);
            # CREATE ODDS GIFT
            $scriptOdds = [];
            foreach ($validated["dataOdds"]["listGift"] as $keyGift => $gift) {

                # UPLOAD IMAGE
                $imageGift = uploadImageQueue($gift['image']);

                $gameCurrency = $this->gameCurrencyRepository->getByKey($gift['typeGift']);

                $serviceGift = $this->serviceGiftRepository->updateOrInsert(null, [
                    "gift_type" => $gift['isRandom'] ? "RANDOM" : "FIXED",
                    "vip" => $gift['isVip'] ? "YES" : "NO",
                    "image" => $imageGift, // link
                    "value1" => $gift['isRandom'] ? $gift['value'][0] : $gift['value'],
                    "value2" => $gift['isRandom'] ? $gift['value'][1] : null,
                    "cost" => 0,
                    "percent_random" => $gift['percent']
                ], serviceOdds: $serviceOdds, gameCurrency: $gameCurrency);
                $scriptOdds[$keyGift] = $serviceGift;
            }

            $computeOdds = function ($oddsData) use ($scriptOdds) {
                $result = [];
                foreach ($oddsData as $odds) {
                    $result[] = ($scriptOdds[$odds['id']])->id;
                }
                return $result;
            };

            $oddsAdmin = $computeOdds($validated['dataOdds']['oddsAdmin']);
            $oddsUser = $computeOdds($validated['dataOdds']['oddsUser']);

            $this->serviceOddsRepository->updateOrInsert($serviceOdds->id, [
                "odds_admin" => $oddsAdmin,
                "odds_user" => $oddsUser
            ]);
        }

        # CREATE SERVICE DETAIL
        $this->serviceDetailRepository->updateOrInsert(
            null,
            [
                "prioritize" => 1,
                "excluding" => $validated['except'] ? "ON" : "OFF",
                "slug" => Str::slug($validated["dataForm"]["name_service_image"])
            ],
            domainsId: $domainsId,
            service: $service,
            serviceGroup: $this->servicelGroupRepository->get(1), // demo
            serviceImage: $serviceImage,
            serviceOdds: isset($serviceOdds) ? $serviceOdds : null
        );

        dd($validated);
    }
}
