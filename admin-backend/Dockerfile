FROM php:8.2-apache
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libzip-dev
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip 

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/html
RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite

RUN composer install --no-interaction --prefer-dist --optimize-autoloader
# RUN php artisan queue:work --queue=high,default
EXPOSE 80
CMD ["apache2-foreground"]