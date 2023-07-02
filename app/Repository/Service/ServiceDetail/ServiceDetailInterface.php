<?php

namespace App\Repository\Service\ServiceDetail;

interface ServiceDetailInterface
{
    public function idServiceDetailList(string $domain);
    public function serviceDetail(string $slug, array $listIdAllow);
}
