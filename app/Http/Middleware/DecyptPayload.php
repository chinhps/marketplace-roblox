<?php

namespace App\Http\Middleware;

use App\Http\Controllers\BaseResponse;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Symfony\Component\HttpFoundation\Response;

class DecyptPayload
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $data = $request->encrypt;
        $encryptionKey = env('CRYPTO_KEY');
        $hmacKey = env('CRYPTO_HMAC_KEY');

        try {
            $components = explode('|', $data);
            $encryptedPayload = $components[0];
            $iv = hex2bin($components[1]);
            $hmac = $components[2];
        } catch (\Exception $e) {
            return BaseResponse::msg("Dữ liệu gửi bên sai! Vui lòng thử lại", 413);
        }

        // Check HMAC
        $computedHmac = hash_hmac('sha256', $encryptedPayload, $hmacKey);
        if ($hmac !== $computedHmac) {
            return BaseResponse::msg("Dữ liệu gửi bên sai!", 413);
        }
        // AES-256-CBC
        $crypt = new Encryption();
        $decryptedPayload = $crypt->decrypt($encryptedPayload, $encryptionKey, $iv);

        if (!$decryptedPayload) {
            return BaseResponse::msg("Dữ liệu gửi bên sai!!.", 413);
        }
        $request->replace(json_decode($decryptedPayload, true));
        return $next($request);
    }
}

class Encryption
{
    protected $encryptMethod = 'AES-256-CBC';

    public function decrypt(string $encryptedString, string $key, string $ivO)
    {
        $json = json_decode((string) base64_decode($encryptedString), true);

        if (
            !is_array($json) ||
            !array_key_exists('salt', $json) ||
            !array_key_exists('iv', $json) ||
            !array_key_exists('ciphertext', $json) ||
            !array_key_exists('iterations', $json)
        ) {
            return null;
        }

        try {
            $salt = hex2bin($json['salt']);
            $iv = hex2bin($json['iv']);
            if ($ivO !==  $iv) {
                throw new \Exception("id wrongs");
            }
        } catch (\Exception $e) {
            return null;
        }

        $cipherText = base64_decode($json['ciphertext']);

        $iterations = intval(abs((int)$json['iterations']));
        if ($iterations <= 0) {
            $iterations = 999;
        }
        $hashKey = hash_pbkdf2('sha512', $key, $salt, $iterations, ($this->encryptMethodLength() / 4));
        unset($iterations, $json, $salt);

        $decrypted = openssl_decrypt($cipherText, $this->encryptMethod, hex2bin($hashKey), OPENSSL_RAW_DATA, $iv);
        if (!is_string($decrypted)) {
            $decrypted = null;
        }
        unset($cipherText, $hashKey, $iv);

        return $decrypted;
    }

    /**
     * Get encrypt method length number (128, 192, 256).
     * 
     * @return integer
     */
    protected function encryptMethodLength(): int
    {
        $number = (int) filter_var($this->encryptMethod, FILTER_SANITIZE_NUMBER_INT);

        return intval(abs($number));
    }
}
