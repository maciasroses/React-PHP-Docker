# Fase 1: Instalar dependencias de Composer
FROM composer as vendor
WORKDIR /vendor
COPY composer.json .

# Instalar las dependencias en la fase vendor, incluyendo phpoffice/phpspreadsheet
RUN composer install --no-dev --no-scripts --no-autoloader --ignore-platform-reqs
RUN composer dump-autoload --optimize

# Fase 2: PHP con Apache
FROM php:8.1.8-apache as dev

# Establecer el directorio de trabajo
WORKDIR /var/www/html/api

# Instalar las extensiones necesarias de PHP
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo_mysql zip

# Habilitar mod_rewrite en Apache
RUN a2enmod rewrite

# Copiar la aplicación y las dependencias de la fase de vendor
COPY . .
COPY --from=vendor /vendor/vendor/ ./vendor/

# Exponer el puerto 80 para Apache
EXPOSE 80
