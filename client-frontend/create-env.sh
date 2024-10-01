#!/bin/bash

# Danh sách các tên miền
domains=(
  "gameroblox.vn"
  "rakyroblox.com"
  "rexroblox.com"
  "aburoblox.com"
  "anhbaphairoblox.vn"
  "jaygrayroblox.com"
  "loczutakiroblox.com"
  "longhtroblox.com"
  "meoreinroblox.com"
  "shopbigshark.vn"
  "shopbun.vn"
  "shopjaki.vn"
  "shoprika.vn"
  "starjinxroblox.com"
  aburoblox.com
)

# Nội dung mẫu cho tệp .env
template_content="VITE_APP_API=\"https://api-hd-client.chinh.dev\"\nVITE_APP_ENCRYPT_KEY=\"chinhdeptraivipro\"\nVITE_APP_HMAC_KEY=\"hoangpham\""

# Tạo các tệp .env cho từng tên miền
for domain in "${domains[@]}"; do
  # Lấy tên miền gốc mà không bao gồm phần sau dấu chấm
  base_domain=$(basename "$domain" | cut -d'.' -f 1)
  env_file=".env.$base_domain"
  echo -e "$template_content\nVITE_APP_DOMAIN=\"$domain\"" > "$env_file"
done

echo "Đã tạo các tệp .env cho từng tên miền."