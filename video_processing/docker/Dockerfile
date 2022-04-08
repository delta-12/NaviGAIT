FROM python:latest
RUN apt update && apt install -y ffmpeg wget
RUN mkdir /navigait
WORKDIR /navigait
RUN wget https://raw.githubusercontent.com/delta-12/NaviGAIT/main/video_processing/detect_vid.py
RUN wget https://raw.githubusercontent.com/delta-12/NaviGAIT/main/video_processing/requirements.txt
RUN pip3 install -r requirements.txt
