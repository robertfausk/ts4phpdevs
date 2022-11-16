Tripp
=====

For symfony ux part see also: https://github.com/weaverryan/sfcon_2022_ux_workshop/tree/finished

- Mercure + Streams
  -  A) in your controller, render a stream template & send to Mercure
  -  B) you can automatically have a stream template rendered whenever an entity is added/updated/deleted

---

https://typescriptlang.org/play

after start: go to https://tripp.local:3000

### How to start local development?

1. ##### Setup a proxy with nginx (which includes docker-gen)
   Place the following ```docker-compose.yml``` in the folder of your choice, e.g. ```/var/apps/nginx-proxy/``` or ```/<your-home-dir>/workspace/nginx-proxy/```.
    ```yaml
    version: "3.4"
   
    services:
        nginx-proxy:
            image: jwilder/nginx-proxy:alpine
            container_name: nginx-proxy
            ports:
                - target: 80
                  published: 80
                  protocol: tcp
                - target: 443
                  published: 443
                  protocol: tcp
            volumes:
                - /var/run/docker.sock:/tmp/docker.sock:ro
                - ./certs:/etc/nginx/certs
                - ./vhosts:/etc/nginx/conf.d
            networks:
                - tripp-dev
    
    networks:
        tripp-dev:
           external: true
    ```

2. ##### Install local ssl certificates
   The following could be automated with own Dockerfile
   including jwilder/nginx-proxy and mkCert - alike to dev-tls docker file. <br>

   First you have to settle on a domain to use for tripp.
   We will use `tripp.local` in the following expamples.
   Using only `tripp` would be troubling for certificates since most browsers
   do not accept wildcard certificates for second-level domains:
   e.g. browser will not accept certs created with `*.tripp` for subdomain `api.tripp`

   ###### install [mkCert](https://github.com/FiloSottile/mkcert)
    ```BASH
    # linux
    wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.1/mkcert-v1.4.1-linux-amd64
    sudo mv mkcert-v1.4.1-linux-amd64 /usr/local/bin/mkcert
    sudo chmod +x /usr/local/bin/mkcert
    ```
    ```BASH
    # macOS
    brew install mkcert
    brew install nss # if you use Firefox
    ```
   ###### Install rootCA
   This automatically adds mkcert's rootCA to your systems trusted CAs so you no longer will be bugged by untrusted certificate notifications in your local browser.
    ```BASH
    mkcert --install
    ```
   ###### create Certs
   Navigate to the nginx-proxy certs volume e.g. `cd /var/apps/nginx-proxy/certs` or ```/<your-home-dir>/workspace/nginx-proxy/certs```
   ```BASH
   mkcert -key-file tripp.local.key -cert-file tripp.local.crt tripp.local *.tripp.local    
   ```
   This generates a certificate for all subdomains of `tripp.local`

3.  ##### setup dns
    ```BASH
    # /etc/hosts
    127.0.0.1	tripp.local
    ```

4. ##### start nginx-proxy

    ```BASH
    # this need to be run only once 
    docker network create tripp-dev
    ```

    ```BASH
    # /var/apps/nginx-proxy/ or /<your-home-dir>/workspace/nginx-proxy/
    docker-compose up -d    
    ```

5. ##### create .env
   ```BASH
   #<yourWorkSpace>/tripp
   cp .env.dist .env
   ```
   Adjust sensible vars like e.g. `JWT_KEY` and `DB_PASSWORD` as needed.
   Make sure the `DOMAIN_NAME` matches the one used when creating certificates.

6. ##### add in your ```.bashrc``` (or ```.zshrc```)
    ```bash
    $ vi ~/.bashrc
    
    ...
    export HOST_UID=$(id -u)      # UID is now available for docker-compose.yml
    export HOST_GID=$(id -g)      # GID is now available for docker-compose.yml

7. ##### start tripp stack
    ```BASH
    docker-compose up -d
    ```
   nginx-proxy will create a vhost entry for each of tripp's services which has an environment variable `VIRTUAL_HOST` set.
   You can check the created hosts in a volume:

    ```BASH
    cat path-to-nginx-proxy/vhosts/default.conf
     ```
8. #### Load the tripp database for api (only if starting from scratch)
    * copy database dump to `web/config/schema`
    * access container command line
         ```BASH
         bin/bash.sh
         ```
    * load database
        ```BASH
         composer database-init
         ```

8. ##### access tripp
   ###### via domain names with self signed certificates
   Advantage: There is no need to accept insecure certs on every first website request.
    * https://tripp.local
    * https://tripp.local/api/docs

   To access with your mobile devices in your local WAN you have to replace 'tripp.local' with your local ip address:
    * Find local ip address in Windows 7 [[1]](https://www.groovypost.com/howto/microsoft/windows-7/find-your-local-ip-address-windows-7-cmd/)
    * Find local ip address in Ubuntu [[1]](https://help.ubuntu.com/stable/ubuntu-help/net-findip.html.en) [[2]](https://itsfoss.com/check-ip-address-ubuntu/)

9. ##### optional: use XDebug

    * Activate XDebug in `.env`:
        ```
        PHP_XDEBUG_ENABLED=1
        ```

    * PHPStorm setup:
        * Settings... -> Languages & Frameworks -> PHP -> Debug:
          Check that Port 9003 is specified:
          ![debug](./docs/debug.png)
        * Start containers:
        ```bash
        $ docker-compose up -d
        ```

    * After clicking "Start Listening for PHP Debug Connections" in PHPStorm you can jump to web and cli breakpoints.

    * To activate/deactivate XDebug simply adjust ENV-Variable `PHP_XDEBUG_ENABLED` in `docker-compose.yml`
      and restart containers (`docker-compose down && docker-compose up -d`) 
