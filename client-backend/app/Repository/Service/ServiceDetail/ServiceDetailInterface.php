<?php

namespace App\Repository\Service\ServiceDetail;

use App\Models\ServiceDetail;
use App\Models\ServiceOdds;

interface ServiceDetailInterface
{
    /**
     * @return array
     */
    public function idServiceDetailList(string $domain);
    /**
     * @return \App\Models\ServiceDetail
     */
    public function serviceDetail(string $slug, array $listIdAllow);
    /**
     * @param array ['id','price','sort']
     * @return \App\Models\ServiceDetail
     */
    public function serviceDetailHaveAccounts(string $slug, array $listIdAllow, array $filter = []);
    /**
     * @return \App\Models\ServiceDetail
     */
    public function serviceGifts(string $slug, array $listIdAllow);
    public function giftForUserByListId(ServiceOdds $serviceOdds, array $listIdGift);
    public function giftForUser(ServiceOdds $serviceOdds);
    public function giftForAdminByListId(ServiceOdds $serviceOdds, array $listIdGift);
    public function giftForAdmin(ServiceOdds $serviceOdds);
    public function simalarServices(ServiceDetail $serviceDetail, array $listIdAllow);
}
