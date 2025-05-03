#!/bin/sh

echo "Đang chờ MySQL..."
while ! nc -z mysql-marketplace 3306; do
  echo "MySQL chưa sẵn sàng, thử lại sau 2 giây..."
  sleep 2
done
echo "MySQL đã sẵn sàng."

# Chạy các lệnh artisan với xử lý lỗi
echo "Đang tạo khóa ứng dụng..."
php artisan key:generate || { echo "Tạo khóa thất bại"; exit 78; }

echo "Đang chạy migrations..."
php artisan migrate --force || { echo "Migration thất bại"; exit 78; }

echo "Đang xóa cache cấu hình..."
php artisan config:clear || { echo "Xóa cache cấu hình thất bại"; exit 78; }

echo "Đang xóa cache ứng dụng..."
php artisan cache:clear || { echo "Xóa cache ứng dụng thất bại"; exit 78; }

echo "Script entrypoint hoàn thành thành công."