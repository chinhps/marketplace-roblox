<?php

namespace App\Repository\Service\ServiceImage;

interface ServiceImageInterface
{
    /**
     * @return \App\Models\ServiceImage
     */
    public function get(float $id);
    /**
     * @return \App\Models\ServiceImage
     */
    public function updateOrInsert(float|null $id, array $params);
}
