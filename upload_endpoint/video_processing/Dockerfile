FROM python:latest
RUN apt update && apt install -y ffmpeg wget git
RUN git clone https://github.com/delta-12/NaviGAIT.git
RUN mv NaviGAIT/upload_endpoint/video_processing /video_processing
RUN rm -Rf NaviGAIT
WORKDIR /video_processing
RUN pip3 install -r requirements.txt
RUN chmod +x start_server.ph
ENTRYPOINT [ "/bin/sh", "/video_processing/start_server.sh" ]