FROM composer:latest as composer
FROM php:8.1-apache

ARG APP_ENVIRONMENT=prod
ARG HOST_UID=1000
ARG HOST_GID=1000
ARG CONTAINER_USER=docker
ARG CONTAINER_GROUP=docker

ENV APP_ENVIRONMENT=${APP_ENVIRONMENT}
ENV HOST_UID=${HOST_UID}
ENV HOST_GID=${HOST_UID}
ENV CONTAINER_GROUP=${CONTAINER_GROUP}
ENV CONTAINER_USER=${CONTAINER_USER}
ENV PANTHER_NO_SANDBOX 1

COPY --from=composer /usr/bin/composer /usr/bin/composer

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# set correct timezone
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN a2enmod rewrite
RUN a2enmod headers
RUN a2enmod remoteip
RUN a2enmod ssl
RUN a2enmod expires

# Use this self-generated certificate only in dev, IT IS NOT SECURE!
RUN openssl genrsa -passout pass:x -out /etc/ssl/private/cert.pass.key 2048
RUN openssl rsa -passin pass:x -in /etc/ssl/private/cert.pass.key -out /etc/ssl/private/cert.key
RUN openssl req -new -key /etc/ssl/private/cert.key -out /etc/ssl/private/cert.csr -batch
RUN openssl x509 -req -days 365 -in /etc/ssl/private/cert.csr -signkey /etc/ssl/private/cert.key -out /etc/ssl/private/cert.crt

RUN apt-get update && apt-get install -y \
    netcat \
    default-mysql-client

RUN docker-php-ext-install -j$(nproc) pdo_mysql
# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 18.6.0
ENV NVM_VERSION 0.39.1

# install nvm
# https://github.com/creationix/nvm#install-script
RUN mkdir $NVM_DIR
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# only needed for yarn :-/
RUN apt-get update && apt-get install -y \
        gnupg \
        apt-transport-https

# yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y \
        yarn

RUN pecl install xdebug && \
    docker-php-ext-enable xdebug

RUN sh -c "echo 'xdebug.remote_enable=1' >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini" && \
    sh -c "echo 'xdebug.remote_autostart=1' >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini" && \
    sh -c "echo 'xdebug.remote_host=172.17.0.1' >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini" && \
    sed -i -e 's/zend_extension/;zend_extension/g' /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

RUN apt-get update && apt-get install -y \
    libzip-dev

RUN pecl install zip

RUN echo "extension=zip.so"  >> /usr/local/etc/php/conf.d/zip.ini

RUN apt-get update && apt-get install -y zlib1g-dev unzip chromium && docker-php-ext-install zip

RUN docker-php-ext-configure opcache --enable-opcache && \
    docker-php-ext-install opcache && \
    pecl install apcu && \
    docker-php-ext-install bcmath && \
    docker-php-ext-enable apcu

# intl
RUN apt-get update && apt-get install -y \
    libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl

RUN apt-get update && apt-get install -y \
		libfreetype6-dev \
		libjpeg62-turbo-dev \
        pdftk \
        libpng-dev \
	&& docker-php-ext-install -j$(nproc) iconv \
	&& docker-php-ext-configure gd --with-jpeg=/usr/include/ \
	&& docker-php-ext-install -j$(nproc) gd

RUN apt-get update && apt-get install -y \
    acl \
    git-core

# BEGIN - needed for docker-node-monitoring
RUN apt-get install -y iproute2
RUN a2enmod remoteip
# END - needed for docker-node-monitoring

# free some space to reduce image size
RUN rm -rf /var/cache/apt/archives/

COPY --from=composer /usr/bin/composer /usr/bin/composer
## https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /home/docker/.composer
## contains dev-mode packages
RUN composer global config --no-plugins allow-plugins.pyrech/composer-changelogs true
RUN composer global require "pyrech/composer-changelogs:^1.8" --prefer-dist --no-progress --no-suggest --classmap-authoritative

RUN apt-get update && apt-get install -y \
    libxml2-dev

RUN docker-php-ext-install -j$(nproc) \
	soap

COPY .docker /
COPY .docker /usr/local/

#COPY composer.json composer.lock symfony.lock /var/www/html/
#COPY src/Kernel.php /var/www/html/src/
#COPY packages /var/www/html/packages

#RUN cd /var/www/html; \
#        composer install --optimize-autoloader --no-scripts

#COPY package.json yarn.lock /var/www/html/
#RUN cd /var/www/html; \
#        yarn install

WORKDIR /var/www/html
COPY . /var/www/html

#RUN cd /var/www/html && \
#    if [ "${APP_ENVIRONMENT}" != "dev" ]; then \
#        yarn encore production; \
#    fi


COPY .docker/start-project.sh /start-project.sh

# clear apt-cache for smaller docker images
RUN apt-get clean -y
RUN chmod 777 /start-project.sh

EXPOSE 443

ENTRYPOINT /start-project.sh
