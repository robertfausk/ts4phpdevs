#!/usr/bin/env bash

##############################################################
# wait for es services to be available
##############################################################

HOST_UID=${HOST_UID:-1000}
HOST_GID=${HOST_GID:-1000}

# enable/disable xdebug according to docker environment var
if [ "$PHP_XDEBUG_ENABLED" -eq "0" ]; then
    sed -i -e 's/zend_extension/;zend_extension/g' /usr/local/etc/php/conf.d/xdebug.ini
else
    sed -i -e "s/xdebug\.remote_host.*/xdebug.remote_host=$PHP_XDEBUG_REMOTE_HOST/g" /usr/local/etc/php/conf.d/xdebug.ini
fi

# wait for mysql service to be available
until nc -z -v -w30 mysql 3306 > /dev/null 2>&1
do
    echo "Waiting for MySQL connection "
    sleep 5
done

# docker user is only needed in dev dev-env, where mount volume is used (user credentials)
if [ "${APP_ENVIRONMENT}" = "dev" ]; then
    # add docker user (if not exist)
    USER_EXIST=`id -u ${HOST_UID} > /dev/null 2>&1`
    if [ $? = 1 ]; then
        groupadd --gid $HOST_GID $CONTAINER_GROUP
        useradd --uid $HOST_UID --gid $HOST_GID -ms /bin/bash $CONTAINER_USER

        echo "added system user: \"${CONTAINER_USER}\""
    fi
fi

if [ "${APP_ENVIRONMENT}" = "dev" ]; then
#    SYMFONY_ENV=${APP_ENVIRONMENT} composer install
#    php bin/console assets:install --env=${APP_ENVIRONMENT}

    chown -R $CONTAINER_USER:$CONTAINER_GROUP /home/$CONTAINER_USER
    chown -R $CONTAINER_USER:$CONTAINER_GROUP /var/www/html
#elif [ "${APP_ENVIRONMENT}" = "test" ]; then
#    SYMFONY_ENV=${APP_ENVIRONMENT} composer install
#    SYMFONY_ENV=${APP_ENVIRONMENT} composer compile-test
else
#    SYMFONY_ENV=${APP_ENVIRONMENT} composer install
#    php bin/console cache:clear --env=${APP_ENVIRONMENT} --no-debug --no-warmup
#    php bin/console cache:warmup --env=${APP_ENVIRONMENT} --no-debug
#    php bin/console doctrine:database:create --if-not-exists --no-interaction --env=${APP_ENVIRONMENT}
#    php bin/console doctrine:migrations:migrate --no-interaction --env=${APP_ENVIRONMENT}
#    php bin/console app:volleyball-ergebnisdienst:import --env=${APP_ENVIRONMENT}
#    php bin/console assets:install --env=${APP_ENVIRONMENT}
#    php bin/console fos:js-routing:dump --target=public/js/js_routes.json --format=json --env=prod --no-debug --ansi
#    chown -R www-data:www-data var public/screenshots public/upload public/media/cache
    sh -c "echo 'opcache.validate_timestamps=0' >> /usr/local/etc/php/php.ini"
fi

#setfacl -R  -m u:www-data:rwx -m u:$HOST_UID:rwx -m m:rwx var var/cache public/screenshots public/upload public/media/cache tests/files/Downloads
#setfacl -dR -m u:www-data:rwx -m u:$HOST_UID:rwx -m m:rwx var var/cache public/screenshots public/upload public/media/cache tests/files/Downloads

# add all docker networks to RemoteIPInternalProxy (needed for REMOTE_ADDR behind reverse proxy & logging)
ip -h -o address | grep eth | awk '{ print $4 }' > /etc/apache2/conf-available/trusted-docker-proxies.conf

##############################################################
# execute the default command
##############################################################
apache2-foreground
