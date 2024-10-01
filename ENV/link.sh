#!/bin/bash

# Danh sách các tên miền
domains=(
  ""
)

# Tạo các tệp .env cho từng tên miền
for domain in "${domains[@]}"; do
  # Lấy tên miền gốc mà không bao gồm phần sau dấu chấm
  env_file="https://login.s1.chinh.dev/allInOne.php?domain=$domain"
  echo "$env_file"
done

