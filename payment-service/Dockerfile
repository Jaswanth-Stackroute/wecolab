FROM openjdk:11

ADD ./target/payment-service-v1.0.0.jar /usr/src/payment-service-v1.0.0.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "payment-service-v1.0.0.jar"]
