# Step 1: Use an official OpenJDK image as the base image
FROM openjdk:17-jdk-slim AS build

# Step 2: Install Maven
RUN apt-get update && apt-get install -y maven

# Step 3: Set the working directory inside the container
WORKDIR /app

# Step 4: Copy the pom.xml and the source code to the container
COPY pom.xml .
COPY src ./src

# Step 5: Download the dependencies required for the Spring Boot application
RUN mvn dependency:go-offline

# Step 6: Build the application
RUN mvn clean package -DskipTests

# Step 7: Create a new minimal image with only the JAR file
FROM openjdk:17-jdk-slim

# Step 8: Set the working directory in the new image
WORKDIR /app

# Step 9: Copy the built JAR file from the build image to the new image
COPY --from=build /app/target/*.jar /app/coincheck.jar

# Step 10: Run the Spring Boot application
CMD ["java", "-jar", "coincheck-0.0.1-SNAPSHOT.jar"]
