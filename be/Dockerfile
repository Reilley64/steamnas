FROM gradle:8.1.1-jdk17 AS build
WORKDIR /app

COPY build.gradle settings.gradle ./
RUN gradle clean

COPY . .
RUN gradle bootJar

FROM cm2network/steamcmd

RUN apt-get update \
    && apt-get install -y --no-install-recommends --no-install-suggests openjdk-17-jdk \
    && apt-get remove --purge --auto-remove -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/build/libs/steamnas-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
