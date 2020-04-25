FROM ubuntu:latest

RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev && \
    pip3 install --upgrade pip

COPY . /app

WORKDIR /app

RUN pip3 install -r requirements.txt

RUN pip3 install 'pymongo[srv]'

EXPOSE 5000

CMD ["python3", "application.py"]
