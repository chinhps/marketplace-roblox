FROM php:8.2-fpm-alpine

# Install PHP extensions and Nginx
RUN apk update && apk add --no-cache \
    nginx \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libzip-dev \
    autoconf \
    g++ \
    make \
    openssl \
    supervisor \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && pecl install redis \
    && docker-php-ext-enable redis

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy custom PHP configuration to conf.d
COPY custom-php.ini /usr/local/etc/php/conf.d/

# WORKDIR
WORKDIR /var/www

# Copy source
COPY . .

COPY .env.example .env

# Session
RUN mkdir -p /var/www/storage/framework/sessions
RUN mkdir -p /var/www/storage/app/uploads_temp

# Set permission
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage \
    && chmod -R 775 /var/www/bootstrap/cache

# Run composer update vendor
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Config Nginx
COPY /nginx/conf.d/nginx.conf /etc/nginx/http.d/chinhdev.conf

# Config Supervisor
COPY supervisord.conf /etc/supervisord.conf

# Open port
EXPOSE 80

# Start Supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]