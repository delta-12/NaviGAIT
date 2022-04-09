FROM node:latest
RUN git clone https://github.com/delta-12/NaviGAIT.git
RUN mkdir /navigait
RUN mv NaviGAIT/upload_endpoint /navigait
RUN rm -Rf NaviGAIT
WORKDIR /navigait/upload_endpoint
RUN npm install .
RUN npm install pm2 -g
RUN echo "pm2 start server.js" >> run_pm2
RUN echo "tail -F /dev/null" >> run_pm2
ENTRYPOINT [ "/bin/sh", "run_pm2" ]
