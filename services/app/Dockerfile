FROM node:latest
RUN apt update && apt install -y certbot cron
RUN git clone https://github.com/delta-12/NaviGAIT.git
RUN mv NaviGAIT/services/app /app
RUN rm -Rf NaviGAIT
WORKDIR /app
RUN mkdir -p videos/uploaded
RUN mkdir videos/processed
RUN npm install .
RUN npm install pm2 -g
COPY start_services.sh start_services.sh
ENTRYPOINT ["/bin/bash", "start_services.sh"]
