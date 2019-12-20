FROM openjdk:11
WORKDIR usr/src
ADD ./target/notification-v1.0.0.jar /usr/src/notification-v1.0.0.jar

EXPOSE 8090

ENTRYPOINT ["java","-jar","/usr/src/notification-v1.0.0.jar"]
