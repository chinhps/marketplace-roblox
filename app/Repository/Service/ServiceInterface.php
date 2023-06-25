<?php

namespace App\Repository\Service;

interface ServiceInterface
{
    public function serviceListByGroup();
    public function serviceDetail();
    public function servicePlay();
    public function servicePlayTry();
}
