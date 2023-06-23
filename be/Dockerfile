FROM gradle:8.1.1-jdk17-alpine AS build
WORKDIR /app

COPY build.gradle settings.gradle ./
RUN gradle clean

COPY . .
RUN gradle bootJar

FROM ghcr.io/graalvm/jdk:ol8-java17

RUN microdnf install glibc-devel.i686 gzip libstdc++.i686 wget

RUN useradd steam
USER steam
WORKDIR /home/steam/Steam
RUN wget "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" && \
    tar zxvf steamcmd_linux.tar.gz

WORKDIR /app

COPY --from=build /app/build/libs/steamnas-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
