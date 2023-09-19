<?php

use App\Helper\Crypto;
use App\Models\ShopList;
use Illuminate\Support\Facades\Log;

if (!function_exists('logReport')) {
    function logReport($chanel, $note, Exception $error = null)
    {
        Log::channel($chanel)->info("$note | Error: " . ($error != null ? $error->getMessage() : ""));
    };
}

if (!function_exists('myIp')) {
    function myIp()
    {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    };
}

if (!function_exists('generateProviderSocial')) {
    function generateProviderSocial(string $social, $uidProvider, ShopList $shop)
    {
        switch ($social) {
            case "facebook";
                $key = 9;
                break;
            case "tiktok";
                $key = 5;
                break;
            case "account";
                $key = 1;
                break;
        }
        return $key . ((int)$uidProvider + $key + $shop->id) . $shop->id;
    };
}

if (!function_exists('generateToken')) {
    function generateToken($user)
    {
        return Crypto::encrypt($user->createToken(env('APP_KEY'))->plainTextToken, env('APP_KEY'));
    }
}
