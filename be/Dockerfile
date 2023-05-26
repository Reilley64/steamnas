FROM steamcmd/steamcmd:ubuntu

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=America/New_York

RUN apt update
RUN apt -y upgrade
RUN apt -y install cron python3 python3-pip tzdata

RUN pip3 install fastapi psycopg2-binary requests rocketry sqlalchemy uvicorn[standard] websockets

WORKDIR /app
COPY *.py /app

ENV DATABASE_URL=sqlite:///database.db

ENTRYPOINT ["python3", "main.py"]
