<?php

namespace App\Repository\Service\ServiceDetail;

use App\Helper\FilterHelper;
use App\Models\ServiceDetail;
use App\Models\ServiceOdds;
use Illuminate\Database\Eloquent\Model;

class ServiceDetailRepository implements ServiceDetailInterface
{
    public function __construct(
        private Model $model = new ServiceDetail()
    ) {
    }

    public function simalarServices(ServiceDetail $serviceDetail, array $listIdAllow)
    {
        return $this->model->whereIn('id', $listIdAllow)
            ->where('service_group_id', $serviceDetail->service_group_id)
            ->select(
                "id",
                "service_group_id",
                "service_id",
                "service_odds_id",
                "service_image_id",
                "slug",
            )
            ->with([
                'service' => function ($query) {
                    $query->select(
                        "id",
                        "price",
                        "sale",
                        "note",
                        "game_id"
                    )->with(['game_list', 'serviceCouter']);
                },
                'serviceImage' => function ($query) {
                    $query->select(
                        "id",
                        "thumb",
                        "images",
                        "name",
                    );
                }
            ])->inRandomOrder()->limit(2)->get();
    }

    public function idServiceDetailList(string $domain)
    {
        $serviceDetailByDomain = new ServiceDetailByDomain(domain: $domain);
        $unexclude = $serviceDetailByDomain->excluding($this->model, exclude: false)->pluck('id');
        $exclude = $serviceDetailByDomain->excluding($this->model, exclude: true);

        # Get all id service exclude
        $idServiceExclude = $exclude->pluck('id');

        $idListNotAllowExclude = $this->model->where('excluding', 'ON')->whereNotIn('id', $idServiceExclude)->pluck('id');
        return [...$unexclude, ...$idListNotAllowExclude];
    }

    public function serviceDetail(string $slug, array $listIdAllow)
    {
        return $this->model
            ->where('slug', $slug)
            ->whereIn('id', $listIdAllow)
            ->with([
                'serviceImage',
                'service.game_list',
                'serviceOdds.serviceGifts:id,odds_id,image,game_currency_id',
            ])
            ->first() ?? false;
    }

    /**
     * @param array ['id','price','sort']
     * @return \App\Models\ServiceDetail
     */
    public function serviceDetailHaveAccounts(string $slug, array $listIdAllow, array $filter)
    {
        $service = $this->model
            ->where('slug', $slug)
            ->whereIn('id', $listIdAllow)
            ->with(['serviceImage', 'service.game_list', 'service.accounts'])
            ->first();

        if (!$service) {
            return false;
        }

        $accounts = $service->service->accounts()
            ->select("id", "service_id", "note", "detail_public", "price", "thumb", "images")
            ->where('active', 'YES')
            ->where('status', 'NOTSELL');

        if (isset($filter['id'])) {
            $accounts = $accounts->where('id', $filter['id']);
        }
        if (isset($filter['price'])) {
            $accounts = $accounts->whereBetween('price', FilterHelper::GetPriceFilter($filter['price']));
        }
        if (isset($filter['sort'])) {
            $accounts = $accounts->orderBy('price', $filter['sort'] == 1 ? "ASC" : "DESC");
        }

        $service->service->setRelation('accounts', $accounts->paginate(15));

        return $service;
    }

    /**
     * @return \App\Models\ServiceDetail
     */
    public function serviceGifts(string $slug, array $listIdAllow)
    {
        return $this->model
            ->where('slug', $slug)
            ->whereIn('id', $listIdAllow)
            ->with([
                'serviceImage',
                'service.game_list',
                'serviceOdds.serviceGifts'
            ])
            ->first() ?? false;
    }

    public function giftForAdminByListId(ServiceOdds $serviceOdds, array $listIdGift)
    {
        return $serviceOdds->serviceGifts()
            ->with('gameCurrency:id,currency_key,currency_name')
            ->whereIn("id", $listIdGift)
            ->get();
    }

    public function giftForAdmin(ServiceOdds $serviceOdds)
    {
        return $serviceOdds->serviceGifts()
            ->with('gameCurrency:id,currency_key,currency_name')
            ->get();
    }

    public function giftForUserByListId(ServiceOdds $serviceOdds, array $listIdGift)
    {
        return $serviceOdds->serviceGifts()
            ->with('gameCurrency:id,currency_key,currency_name')
            ->where('vip', 'NO')
            ->whereIn("id", $listIdGift)
            ->get();
    }

    public function giftForUser(ServiceOdds $serviceOdds)
    {
        return $serviceOdds->serviceGifts()
            ->with('gameCurrency:id,currency_key,currency_name')
            ->where('vip', 'NO')
            ->get();
    }
}

class ServiceDetailByDomain
{
    public function __construct(
        private string $domain,
    ) {
    }
    public function excluding(Model $model, bool $exclude)
    {
        $domain = $this->domain;
        return $model::where('excluding', $exclude ? "ON" : "OFF")
            ->whereHas('shop_list', function ($query) use ($domain) {
                $query->where('domain', $domain);
            })->get();
    }
}
