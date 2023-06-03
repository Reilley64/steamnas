FROM gradle:8.1.1-jdk17-alpine AS build
WORKDIR /app

COPY build.gradle settings.gradle ./
RUN gradle clean

COPY . .
RUN gradle bootJar

FROM steamcmd/steamcmd:alpine

RUN apk add --no-cache openjdk17
RUN echo "x86" > /etc/apk/arch
RUN apk add --no-cache libcurl

WORKDIR /app

COPY --from=build /app/build/libs/steamnas-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
