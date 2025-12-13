# Backend Service

The backend service is a **Spring Boot 3.5.6** REST API that serves as the core application logic layer and API gateway for the Intelligent Health Prediction System. It handles user authentication, authorization, data persistence, and orchestrates communication with the Python prediction service.

## Key Features

- **JWT-based Authentication & Authorization**: Secure user authentication with role-based access control (RBAC)
- **RESTful API**: Comprehensive REST endpoints for user management, health predictions, and data persistence
- **API Gateway Pattern**: Centralized entry point that orchestrates requests to microservices
- **Database Management**: PostgreSQL integration with Flyway for schema versioning and migrations
- **AI Integration**: Google Gemini API integration for generating personalized health recommendations
- **OpenAPI Documentation**: Interactive API documentation via Swagger UI

## Technology Stack

- **Java 21** - Programming language
- **Spring Boot 3.5.6** - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence layer
- **PostgreSQL** - Relational database
- **Flyway** - Database migration management
- **JWT (jjwt)** - JSON Web Token authentication
- **OpenFeign** - HTTP client for microservices communication
- **SpringDoc OpenAPI** - API documentation
- **Lombok** - Boilerplate reduction

## API Documentation

Interactive API documentation is available via Swagger UI when the service is running:

**Swagger UI**: [http://localhost:8080/swagger-ui/index.html#/](http://localhost:8080/swagger-ui/index.html#/)

**OpenAPI JSON**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

> **Note**: Swagger UI is enabled in the `dev` profile. Ensure the backend is running with `SPRING_PROFILES_ACTIVE=dev`.

## API Endpoints Overview

All endpoints are documented in the interactive Swagger UI. Below is a quick reference:

### Authentication
- `POST /auth/login` - User authentication

### User Management
- `POST /api/users` - User registration
- `GET /api/users/{userId}` - Get user details
- `PUT /api/users/{userId}` - Update user information
- `DELETE /api/users/{userId}` - Delete user account

### User Demographics
- `GET /api/users/demographics/{userId}` - Get demographic data
- `POST /api/users/demographics/{userId}` - Create demographic data
- `PUT /api/users/demographics/{userId}` - Update demographic data

### Health Predictions
- `POST /api/predictions/diabetes/{userId}` - Diabetes risk prediction
- `POST /api/predictions/heart-attack/{userId}` - Heart attack risk prediction
- `POST /api/predictions/stroke/{userId}` - Stroke risk prediction
- `POST /api/predictions/habits/{userId}` - Lifestyle habits assessment

### Prediction History
- `GET /api/prediction-history/{userId}` - Retrieve user's prediction history

> **Note**: For detailed request/response schemas and examples, refer to the [Swagger UI](http://localhost:8080/swagger-ui/index.html#/) or [OpenAPI JSON](http://localhost:8080/v3/api-docs).

## Environment Configuration

The application uses environment variables for configuration. Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env
```

### Required Variables

- `GEMINI_API_KEY` - Google AI Studio API key (required)
- `JWT_SECRET` - Secret key for JWT token signing (minimum 64 characters recommended)

### Optional Gemini Configuration

- `GEMINI_API_VERSION` - API version (default: `v1beta`)
- `GEMINI_MODEL` - Model name (default: `gemini-2.0-flash`)
- `GEMINI_TEMPERATURE` - Randomness control, 0.0-1.0 (default: `0.3`)
- `GEMINI_TOP_P` - Nucleus sampling (default: `0.90`)
- `GEMINI_MAX_OUTPUT_TOKENS` - Maximum response length (default: `2048`)
- `GEMINI_TIMEOUT_MS` - Request timeout in milliseconds (default: `30000`)

### Obtaining a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Add it to your `.env` file as `GEMINI_API_KEY`

> **Security Note**: Never commit `.env` files to version control. Keep API keys secure.

## Database Setup

### Using Docker Compose

The recommended approach is to use the Docker Compose setup from the project root:

```bash
docker-compose up -d postgres
```

This starts PostgreSQL on port `5433` (host) mapping to `5432` (container).

### Accessing the Database

You can access the PostgreSQL database directly using the `psql` command-line tool:

```bash
docker exec -it studio-projektowe-postgres psql -U postgres -d health-app-db
```

This command:
- Connects to the running PostgreSQL container (`studio-projektowe-postgres`)
- Uses the `postgres` user
- Connects to the `health-app-db` database
- Provides an interactive `psql` session

### Database Migrations

Schema changes are managed with **Flyway**. Migrations are applied automatically at application startup.

- **Migration Directory**: `src/main/resources/db/migration`
- **Naming Convention**: `V{version}__{description}.sql` (e.g., `V1__create_users_table.sql`)

#### Creating a New Migration

1. Determine the next version number (increment from the latest)
2. Create a new `.sql` file following the naming convention
3. Add your SQL statements (DDL/DML)
4. Start the application; Flyway will apply pending migrations automatically

> **Important**: Never modify already-applied migration files. Create new migrations for schema changes.

#### Repairing a Broken Database

If the database schema gets into a broken state, you can use Flyway's repair command:

```bash
./mvnw flyway:clean flyway:migrate -Dflyway.cleanDisabled=false \
  -Dflyway.url=jdbc:postgresql://localhost:5433/health-app-db \
  -Dflyway.user=postgres \
  -Dflyway.password=postgres
```

> **Warning**: This command deletes schema history entries. Use with caution.

## Running the Service

### Using Docker Compose (Recommended)

From the project root:

```bash
docker-compose up --build backend
```

### Local Development

1. Ensure PostgreSQL is running (via Docker Compose or locally)
2. Load environment variables:
   ```bash
   # On macOS/Linux (zsh/bash)
   source backend/.env
   
   # On Windows (PowerShell)
   Get-Content backend/.env | ForEach-Object { $line = $_ -split '='; [Environment]::SetEnvironmentVariable($line[0], $line[1], 'Process') }
   ```
3. Run the application:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

The service will start on `http://localhost:8080` (default port).

## Development Profiles

- **dev** (`application-dev.yml`): Development configuration with Swagger enabled
- **prod** (`application-prod.yml`): Production configuration

Set the active profile via environment variable:
```bash
export SPRING_PROFILES_ACTIVE=dev
```

## Project Structure

```
backend/
├── src/main/java/com/healthapp/backend/
│   ├── controller/          # REST controllers
│   ├── service/             # Business logic
│   ├── repository/          # Data access layer
│   ├── model/              # Entity models
│   ├── dto/                # Data transfer objects
│   ├── config/             # Configuration classes
│   ├── exception/          # Exception handlers
│   └── annotation/         # Custom annotations
├── src/main/resources/
│   ├── application.yml     # Base configuration
│   ├── application-dev.yml # Development profile
│   ├── application-prod.yml # Production profile
│   └── db/migration/       # Flyway migrations
└── pom.xml                 # Maven dependencies
```

## Security

- All endpoints except `/auth/login` and `/api/users` (POST) require JWT authentication
- Role-based access control (RBAC) with `@IsOwnerOrAdmin` annotation
- CORS configuration for cross-origin requests
- Password encryption using BCrypt

## Additional Resources

For comprehensive project documentation, see the main [README.md](../README.md) in the project root.
