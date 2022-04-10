if [ ! -e /etc/letsencrypt/live/navigait-uploader.ddns.net ]; then
    certbot --agree-tos -m deltacloudservices@protonmail.com certonly --standalone --preferred-challenges http -d navigait-uploader.ddns.net --force-renewal --redirect
fi

echo "0 0 * * 0 /usr/bin/certbot renew && pm2 restart server" >> certbot.renewal
crontab certbot.renewal
service cron start
pm2 start server.js
tail -F /dev/null
tail -F /var/log/nginx/error.log > /dev/null