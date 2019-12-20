FROM openjdk:11
WORKDIR usr/src
ADD ./target/chat-service-v1.0.0.jar /usr/src/chat-service-v1.0.0.jar

EXPOSE 8086

ENTRYPOINT ["java","-jar","/usr/src/chat-service-v1.0.0.jar"]
