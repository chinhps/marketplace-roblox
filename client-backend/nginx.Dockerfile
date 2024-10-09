FROM nginx:stable-alpine3.20-perl
LABEL group=marketplace-roblox

COPY ./nginx/conf.d/ /etc/nginx/conf.d/

RUN cd /etc/nginx/conf.d && rm -f default.conf

COPY ./public /var/www/

RUN chown -R nginx:nginx /var/www/

WORKDIR /var/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]