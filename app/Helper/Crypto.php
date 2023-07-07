<?php

namespace App\Helper;

class Crypto
{
    public static function encrypt(string $data, string $key)
    {
        $cipher = "AES-256-CBC";
        $ivLength = openssl_cipher_iv_length($cipher);
        $iv = openssl_random_pseudo_bytes($ivLength);
        $encrypted = openssl_encrypt($data, $cipher, $key, OPENSSL_RAW_DATA, $iv);
        $hmac = hash_hmac('sha256', $encrypted, $key, true);
        $encryptedData = base64_encode($iv . $hmac . $encrypted);
        return $encryptedData;
    }

    public static function decrypt(string $encryptedData, string $key)
    {
        $data = base64_decode($encryptedData);
        $cipher = "AES-256-CBC";
        $ivLength = openssl_cipher_iv_length($cipher);
        $iv = substr($data, 0, $ivLength);
        $hmac = substr($data, $ivLength, 32);
        $encrypted = substr($data, $ivLength + 32);
        $calculatedHmac = hash_hmac('sha256', $encrypted, $key, true);
        if (hash_equals($hmac, $calculatedHmac)) {
            $decrypted = openssl_decrypt($encrypted, $cipher, $key, OPENSSL_RAW_DATA, $iv);

            // Kiểm tra lỗi và xử lý các ngoại lệ, Lưu thêm log ở đây
            if ($decrypted === false) return false;

            return $decrypted;
        }
        // Xử lý lỗi tính toàn vẹn dữ liệu, Lưu thêm log ở đây
        return false;
    }
}
