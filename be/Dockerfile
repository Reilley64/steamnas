FROM gradle:8.1.1-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle build --no-daemon

FROM steamcmd/steamcmd:ubuntu

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "./app.jar"]
