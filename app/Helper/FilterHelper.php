<?php

namespace App\Helper;

class FilterHelper
{
    public static function GetPriceFilter($price)
    {
        switch ($price) {
            case 1:
                $cashStart = 0;
                $cashEnd = 50000;
                break;
            case 2:
                $cashStart = 50000;
                $cashEnd = 200000;
                break;
            case 3:
                $cashStart = 200000;
                $cashEnd = 500000;
                break;
            case 4:
                $cashStart = 500000;
                $cashEnd = 1000000;
                break;
            case 5:
                $cashStart = 1000000;
                $cashEnd = 50000000;
                break;
            case 6:
                $cashStart = 5000000;
                $cashEnd = 50000000;
                break;
            case 7:
                $cashStart = 10000000;
                $cashEnd = 500000000;
                break;
            default:
                $cashStart = 0;
                $cashEnd = 50000000;
                break;
        }
        return [$cashStart, $cashEnd];
    }
}
