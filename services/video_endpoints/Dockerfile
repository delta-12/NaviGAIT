FROM node:latest
RUN apt update && apt install -y certbot cron
RUN git clone https://github.com/delta-12/NaviGAIT.git
RUN mv NaviGAIT/services/video_endpoints /video_endpoints
RUN rm -Rf NaviGAIT
WORKDIR /video_endpoints
RUN mkdir -p videos/uploaded
RUN mkdir videos/processed
RUN npm install .
RUN npm install pm2 -g
COPY start_services.sh start_services.sh
ENTRYPOINT ["/bin/bash", "start_services.sh"]
