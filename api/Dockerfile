FROM composer as vendor 
WORKDIR /vendor
COPY composer.json .

RUN composer install --no-dev

FROM php:8.1.8-apache as dev

WORKDIR /var/www/html/api

RUN docker-php-ext-install pdo pdo_mysql

RUN a2enmod rewrite

COPY . .
COPY --from=vendor /vendor/vendor/ ./vendor/

EXPOSE 80