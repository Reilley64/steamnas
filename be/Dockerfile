FROM gradle:8.1.1-jdk17 AS build
WORKDIR /app

COPY build.gradle settings.gradle ./
RUN gradle clean

COPY . .
RUN gradle bootJar

FROM steamcmd/steamcmd:ubuntu

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/New_York

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openjdk-17-jdk tzdata && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/build/libs/steamnas-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
