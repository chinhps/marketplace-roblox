<?php

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
