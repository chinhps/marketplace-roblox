import { InternalAxiosRequestConfig } from "axios";
import { encryptionKey, hmacKey, token } from "./const";
import { myDomain } from "./version";
import CryptoJS from "crypto-js";

export default async function requestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.method === "post") {
    config.data = {
      ...config.data,
      domain: myDomain(),
    };
  }
  if (config.method === "get") {
    config.params = {
      ...config.params,
      domain: myDomain(),
    };
  }

  if (token()) {
    config.headers.Authorization = "Bearer " + token();
  }
  
  const crypt = new Encryption();
  const payloadString = JSON.stringify(config.params ?? config.data);
  const iv = CryptoJS.lib.WordArray.random(16); // the reason to be 16, please read on `encryptMethod` property.

  const encryptedPayload = crypt.encrypt(payloadString, encryptionKey, iv);
  // create HMAC for payload
  const hmac = CryptoJS.HmacSHA256(encryptedPayload, hmacKey).toString();
  const encryptedData = `${encryptedPayload}|${iv}|${hmac}`;

  if (config.method === "post") {
    config.data = {
      encrypt: encryptedData,
    };
  }
  if (config.method === "get") {
    config.params = {
      encrypt: encryptedData,
    };
  }

  return config;
}

class Encryption {
  get encryptMethodLength(): number {
    const encryptMethod = this.encryptMethod;
    // get only number from string.
    const aesNumber = parseInt(encryptMethod.match(/\d+/)![0]);
    return aesNumber;
  }

  get encryptMethod(): string {
    return "AES-256-CBC";
  }

  encrypt(
    inputString: string,
    key: string,
    iv: CryptoJS.lib.WordArray
  ): string {
    const salt = CryptoJS.lib.WordArray.random(50);
    let iterations = 999;
    const encryptMethodLength = this.encryptMethodLength / 4; // example: AES number is 256 / 4 = 64
    const hashKey = CryptoJS.PBKDF2(key, salt, {
      hasher: CryptoJS.algo.SHA512,
      keySize: encryptMethodLength / 8,
      iterations: iterations,
    });

    const encrypted = CryptoJS.AES.encrypt(inputString, hashKey, {
      mode: CryptoJS.mode.CBC,
      iv: iv,
    });
    const encryptedString = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    const output = {
      ciphertext: encryptedString,
      iv: CryptoJS.enc.Hex.stringify(iv),
      salt: CryptoJS.enc.Hex.stringify(salt),
      iterations: iterations,
    };

    return CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(JSON.stringify(output))
    );
  }
}
