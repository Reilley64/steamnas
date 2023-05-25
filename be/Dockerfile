FROM steamcmd/steamcmd:ubuntu

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=America/New_York

RUN apt update
RUN apt -y upgrade
RUN apt -y install cron python3 python3-pip tzdata

RUN pip3 install fastapi psycopg2-binary requests sqlalchemy uvicorn[standard]

WORKDIR /app
COPY *.py /app

ENV DATABASE_URL=sqlite:///database.db

RUN echo "0 4 * * * /usr/bin/python3 /app/update.py" > /etc/cron.d/steamnas
RUN crontab /etc/cron.d/steamnas
RUN cron

ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
