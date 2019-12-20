FROM openjdk:11
WORKDIR usr/src
ADD ./target/eureka-service-v1.0.0.jar /usr/src/eureka-service-v1.0.0.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/usr/src/eureka-service-v1.0.0.jar"]
