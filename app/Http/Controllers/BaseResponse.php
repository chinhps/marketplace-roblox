<?php

namespace App\Http\Controllers;

class BaseResponse
{

    public static function msg(string $msg, $status = 200)
    {
        return response()->json(['msg' => $msg], $status);
    }

    public static function token(string $token, string $msg, $status = 200)
    {
        return response()->json(['token' => $token, "msg" => $msg], $status);
    }

    public static function data(array $data, $status = 200)
    {
        return response()->json(["status" => $status, "data" => $data], $status);
    }
}
