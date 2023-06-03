FROM gradle:8.1.1-jdk17 AS build
WORKDIR /app

COPY build.gradle settings.gradle ./
RUN gradle clean

COPY . .
RUN gradle bootJar

FROM cm2network/steamcmd

RUN apt update -y && apt upgrade -y
RUN apt install -y openjdk-17-jdk

WORKDIR /app

COPY --from=build /app/build/libs/steamnas-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
