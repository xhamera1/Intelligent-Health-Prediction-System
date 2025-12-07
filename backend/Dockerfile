FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

# Download dependencies
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN ./mvnw dependency:go-offline -B

# Build the application
COPY src src
RUN ./mvnw clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy the built application from the build stage
COPY --from=build /app/target/health-prediction-backend-1.0.0.jar target/health-prediction-backend-1.0.0.jar

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/health-prediction-backend-1.0.0.jar"]
