FROM steamcmd/steamcmd:ubuntu

RUN apt update
RUN apt -y upgrade
RUN apt -y install python3 python3-pip

RUN pip3 install fastapi psycopg2-binary requests rocketry sqlalchemy uvicorn[standard] websockets

WORKDIR /app
COPY *.py /app

ENV DATABASE_URL=sqlite:///database.db

ENTRYPOINT ["python3", "main.py"]
