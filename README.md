A side project used to evaluate whether a stock in NASDAQ is halal to invest or not

## To push to prod

* git pull origin master
* yarn run build
* pm2 restart all


## To setup nginx config, there is a sample one used under /infra

* nginx config set under `/etc/nginx/sites-enabled/default`

## To setup Letsencrypt for SSL in Digital Ocean

* https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04

## DNS Setting in Digital Ocean

* In the folder /infra
