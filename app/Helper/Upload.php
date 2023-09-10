<?php

use App\Jobs\UploadFileAPI;

if (!function_exists('uploadImageQueue')) {
    function uploadImageQueue($image)
    {
        if (is_string($image)) return $image;
        $name = generateRandomFileName();
        # UPLOAD IMAGE QUEUE
        UploadFileAPI::dispatch(
            $image->store('uploads_temp'),
            $name,
            $image->getClientOriginalName()
        );
        return env('API_SERVER_IMAGE_STORAGE') . '/' . $name . '.' . $image->getClientOriginalExtension();
    };
}

if (!function_exists('generateRandomFileName')) {
    function generateRandomFileName()
    {
        $prefix = 'image-';
        $uniqueId = uniqid();
        $randomString = bin2hex(random_bytes(16)); // Tạo chuỗi ngẫu nhiên có 32 ký tự
        $fileName = "{$prefix}{$uniqueId}-{$randomString}";
        return $fileName;
    };
}
