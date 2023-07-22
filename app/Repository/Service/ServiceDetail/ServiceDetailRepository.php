<?php

namespace App\Repository\Service\ServiceDetail;

use App\Models\Service;
use App\Models\ServiceDetail;
use App\Models\ServiceGift;
use App\Models\ServiceOdds;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class ServiceDetailRepository implements ServiceDetailInterface
{
    public function __construct(
        private Model $model = new ServiceDetail()
    ) {
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
