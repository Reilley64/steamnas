FROM --platform=linux/amd64 gradle:8.1.1-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle bootJar --no-daemon

FROM --platform=linux/amd64 steamcmd/steamcmd:ubuntu

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/build/libs/steamnas-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
