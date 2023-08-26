<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Service\ServiceCreateRequest;
use App\Http\Resources\Service\ServiceListResource;
use App\Repository\Game\GameCurrency\GameCurrencyInterface;
use App\Repository\Game\GameList\GameListInterface;
use App\Repository\Service\ServiceInterface;
use Illuminate\Support\Str;

class ServiceController extends Controller
{

    public function __construct(
        private ServiceInterface $serviceRepository,
        private GameListInterface $gameListRepository,
        private GameCurrencyInterface $gameCurrencyRepository
    ) {
    }

    public function list()
    {
        return ServiceListResource::collection($this->serviceRepository->list());
    }

    public function getId($id)
    {
        return new ServiceListResource($this->serviceRepository->get($id));
    }

    public function delete($id)
    {
        try {
            $this->serviceRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }

    public function update(ServiceCreateRequest $request)
    {
        $validated = $request->validated();
        /**
         * @var \App\Models\GameCurrency
         */
        $gameCurrencyModel = $this->gameCurrencyRepository->get($validated['game_currency_id']);
        /**
         * @var \App\Models\GameList
         */
        $gameListModel = $this->gameListRepository->get($validated['game_id']);

        $dataService = [
            "note" => $validated["note"],
            "price" => $validated["price"],
            "excluding" => "OFF",
            "notification" => $validated["notification"],
            "active" => $validated["active"],
            "sale" => $validated["sale"],
            "information" => $validated["information"],
        ];

        if (!$validated['id']) {
            array_push($dataService, [
                "service_key" => Str::random(15),
            ]);
        }

        return $this->serviceRepository->updateOrInsert($validated['id'], $dataService, $gameCurrencyModel, $gameListModel);
    }
}
