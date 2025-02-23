#!/bin/sh

while ! nc -z mysql-marketplace 3306; do
  sleep 2
done

php artisan key:generate

php artisan migrate --force

php artisan config:clear

php artisan cache:clear

php-fpm