<?php

namespace App\Http\Controllers\Service;

use App\Models\Service;
use App\Models\ServiceGift;
use App\Models\ServiceHistory;
use App\Repository\Transaction\TransactionInterface;

enum Currencies
{
    case DIAMOND;
    case ROBUX;
    case ACCOUNT;
    case PRICE;
}
enum GiftType
{
    case FIXED;
    case RANDOM;
}


class ServiceHandle
{
    /**
     * handleGuardValueOdds
     * 
     * @return number|false
     */
    public static function handleGuardValueOdds(ServiceGift $serviceGift, $currency)
    {
        $valueGift = self::giftType($serviceGift->gift_type, $serviceGift->value1, $serviceGift->value1);

        switch ($currency) {
            case "DIAMOND":
                if ($valueGift > 300) return false;
                break;
            case "ROBUX":
                if ($valueGift > 2000) return false;
                break;
                // case "ACCOUNT":
                //     break;
            case "PRICE":
                if ($valueGift > 19000) return false;
                break;
        }
        return $valueGift;
    }

    public static function handleGiveGiftByService(
        TransactionInterface $transactionRepository,
        float $idServiceHistory,
        string $nameService,
        string $currency,
        float $value
    ) {
        $note = json_encode([
            "nameService" => $nameService,
            "history_service_id" => $idServiceHistory
        ]);
        switch ($currency) {
            case "DIAMOND":
                return $transactionRepository->createDiamond($value, $note);
                break;
            case "ROBUX":
                return $transactionRepository->creaeteRobux($value, $note);
                break;
            case "PRICE":
                return $transactionRepository->createPrice($value, $note);
                break;
        }
    }

    private static function giftType($giftType, float $value1, float|null $value2)
    {
        switch ($giftType) {
            case "FIXED":
                return $value1;
            case "RANDOM":
                return rand($value1, $value2);
        }
    }
}
