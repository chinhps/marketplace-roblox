<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Service\ServiceCreateRequest;
use App\Http\Resources\Service\ServiceEditResource;
use App\Http\Resources\Service\ServiceListByGameResource;
use App\Http\Resources\Service\ServiceListResource;
use App\Repository\Game\GameCurrency\GameCurrencyInterface;
use App\Repository\Game\GameList\GameListInterface;
use App\Repository\Service\ServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{

    public function __construct(
        private ServiceInterface $serviceRepository,
        private GameListInterface $gameListRepository,
        private GameCurrencyInterface $gameCurrencyRepository
    ) {
    }

    public function list(Request $request)
    {
        $active = $request->input('active');
        $id = $request->input('id');
        $noteService = $request->input('note_service');
        $sort = $request->input('sort');

        $filter = [];

        if ($active) {
            $filter['query'][] = ['active', '=', $active == 1 ? "ON" : "OFF"];
        }
        if ($id) {
            $filter['query'][] = ['id', $id];
        }
        if ($noteService) {
            $filter['query'][] = ['note', 'like', "%$noteService%"];
        }
        if ($sort) {
            $filter['sort'][] = ['id', $sort == 1 ? 'asc' : 'desc'];
        }

        return ServiceListResource::collection($this->serviceRepository->list(10, $filter));
    }

    public function listAll(Request $request)
    {
        $gameKey = $request->input('game_key');
        return ServiceListByGameResource::collection($this->serviceRepository->listServiceByGameList($gameKey));
    }

    public function getId($id, $idDetail)
    {
        return new ServiceEditResource($this->serviceRepository->get($id, $idDetail));
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
