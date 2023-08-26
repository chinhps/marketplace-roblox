<?php

namespace App\Repository\Service\ServiceDetail;

interface ServiceDetailInterface
{
    public function list($limit = 15);
    public function delete(float $id);
}
