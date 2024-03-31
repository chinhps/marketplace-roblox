<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Service\ServiceOddsCreateRequest;
use App\Http\Resources\Service\ServiceOddsListResource;
use App\Repository\Service\ServiceOdds\ServiceOddsInterface;
use Illuminate\Http\Request;

class ServiceOddsController extends Controller
{
    public function __construct(
        private ServiceOddsInterface $serviceOddsRepository,
    ) {
    }

    public function list(Request $request)
    {
        $limit = $request->input('limit', 15);
        return ServiceOddsListResource::collection($this->serviceOddsRepository->list($limit));
    }

    public function getId($id)
    {
        return new ServiceOddsListResource($this->serviceOddsRepository->get($id), true);
    }

    public function delete($id)
    {
        try {
            $this->serviceOddsRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }

    public function upsert(ServiceOddsCreateRequest $request)
    {
        $validated = $request->validated();

        return $this->serviceOddsRepository->updateOrInsert($validated['id'], [
            "odds_admin_type" => $validated['odds_admin_type'],
            "odds_admin" => $validated['odds_admin'],
            "odds_user_type" => $validated['odds_user_type'],
            "odds_user" => $validated['odds_user'],
        ]);
    }
}
