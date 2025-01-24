FROM python:3.11

ENV PYTHONUNBUFFERED 1
RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install -y gdal-bin libgdal-dev
RUN apt-get install -y python3-gdal
RUN apt-get install -y binutils libproj-dev

WORKDIR /app
COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
CMD python manage.py consume_messages
CMD python manage.py runserver 0.0.0.0:8000

