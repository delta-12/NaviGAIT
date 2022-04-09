if [ ! -e /etc/letsencrypt/live/navigait-uploader.ddns.net ]; then
    certbot --agree-tos -m deltacloudservices@protonmail.com -d navigait-uploader.ddns.net --force-renewal --redirect
fi

nginx -t
service nginx start
echo "0 0 * * 0 /usr/bin/certbot renew && service nginx restart" >> certbot.renewal
crontab certbot.renewal
service cron start
tail -F /var/log/nginx/error.log > /dev/null