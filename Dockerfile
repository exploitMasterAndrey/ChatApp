FROM openjdk:18
COPY /target/chatApp-0.0.1-SNAPSHOT.jar chatApp-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/chatApp-0.0.1-SNAPSHOT.jar"]