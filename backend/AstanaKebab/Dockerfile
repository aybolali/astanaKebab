# building the jar from docker itself - this is the recommended way to build the jar from the dockerfile
FROM maven:3-openjdk-17 AS builder
WORKDIR /build
COPY pom.xml ./
COPY src ./src
RUN mvn clean package

# create the runtime image
FROM openjdk:17-jdk
WORKDIR /app

#copy the built JAR from the builder stage
COPY --from=builder /build/target/AstanaKebab-0.0.1-SNAPSHOT.jar astanakebab.jar
EXPOSE 8443
ENTRYPOINT ["java", "-jar", "astanakebab.jar"]

