if [ ! -e /etc/letsencrypt/live/navigait-uploader.ddns.net ]; then
    certbot --agree-tos -m deltacloudservices@protonmail.com certonly --standalone --preferred-challenges http -d navigait-uploads.ddns.net --force-renewal --redirect
fi

echo "0 0 * * 0 /usr/bin/certbot renew && pm2 restart server" >> certbot.renewal
crontab certbot.renewal
service cron start
export WEBAPP="https://navigait-web-app.herokuapp.com"
pm2 start server.js
tail -F /dev/null