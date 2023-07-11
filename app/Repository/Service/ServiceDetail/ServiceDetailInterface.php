<?php

namespace App\Repository\Service\ServiceDetail;

use App\Models\ServiceOdds;

interface ServiceDetailInterface
{
    public function idServiceDetailList(string $domain);
    /**
     * @return \App\Models\ServiceDetail
     */
    public function serviceDetail(string $slug, array $listIdAllow);
    /**
     * @return \App\Models\ServiceDetail
     */
    public function serviceGifts(string $slug, array $listIdAllow);
    public function giftForUserByListId(ServiceOdds $serviceOdds, array $listIdGift);
    public function giftForUser(ServiceOdds $serviceOdds);
}
