FROM eclipse-temurin:17-jre-alpine

LABEL maintainer="engineering-challenge"
LABEL service="eureka-server"

WORKDIR /app

# Copy the JAR file
COPY target/eureka-server-1.0.0.jar app.jar

# Expose Eureka port
EXPOSE 8761

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8761/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]

