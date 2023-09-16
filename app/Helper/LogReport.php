<?php

use Illuminate\Support\Facades\Log;

if (!function_exists('logReport')) {
    function logReport($chanel, $note, Exception $error)
    {
        Log::channel($chanel)->info("$note | Error: {$error->getMessage()}");
    };
}
