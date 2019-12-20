FROM openjdk:11
WORKDIR usr/src
ADD ./target/config-service-v1.0.0.jar /usr/src/config-service-v1.0.0.jar

EXPOSE 8888

ENTRYPOINT ["java","-jar","/usr/src/config-service-v1.0.0.jar"]
