#!/bin/bash

# Danh sách các tên miền
domains=(
  "aburoblox.com"
  "anhbaphairoblox.vn"
  "gameroblox.vn"
  "jaygrayroblox.com"
  "loczutakiroblox.com"
  "longhtroblox.com"
  "rexroblox.com"
  "shopbun.vn"
  "shopjaki.vn"
  "shoprika.vn"
  "starjinxroblox.com"
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

for domain in "${domains[@]}"; do
  base_domain=$(basename "$domain" | cut -d'.' -f 1)
  command="tsc && vite build --mode $base_domain --outDir domain/$domain/public_html"
  echo "$command"
done