FROM python:latest
RUN apt update && apt install -y ffmpeg
RUN mkdir /navigait
WORKDIR /navigait
COPY requirements.txt .
COPY detect_vid.py .
RUN pip3 install -r requirements.txt
