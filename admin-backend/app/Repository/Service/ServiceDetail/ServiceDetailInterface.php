<?php

namespace App\Repository\Service\ServiceDetail;

use App\Models\Service;
use App\Models\ServiceGroup;
use App\Models\ServiceImage;
use App\Models\ServiceOdds;

interface ServiceDetailInterface
{
    public function list($limit = 15);
    /**
     * @return \App\Models\ServiceDetail
     */
    public function get(float $id);
    public function delete(float $id);
    public function updateOrInsert(
        float|null $id,
        array $params,
        array $domainsId,
        Service $service,
        ServiceGroup $serviceGroup,
        ServiceImage $serviceImage,
        ?ServiceOdds $serviceOdds
    );
}
