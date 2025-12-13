# Health Prediction Service

The Health Prediction Service is a **FastAPI**-based microservice that provides machine learning-powered health risk predictions. It serves as a dedicated inference engine, loading pre-trained ML models and performing real-time predictions for diabetes, heart attack, and stroke risk assessments.

## Key Features

- **Machine Learning Inference**: Pre-trained models (Random Forest, AdaBoost, SVM) for health risk prediction
- **RESTful API**: FastAPI-based endpoints with automatic OpenAPI documentation
- **Model Management**: Dynamic model loading from serialized pickle files
- **Type Safety**: Pydantic models for request/response validation
- **Scalable Architecture**: Stateless service design for horizontal scaling
- **CORS Support**: Configurable cross-origin resource sharing

## Technology Stack

- **Python 3** - Programming language
- **FastAPI** - Modern, high-performance web framework
- **scikit-learn** - Machine learning library for model inference
- **pandas** - Data manipulation and preprocessing
- **numpy** - Numerical computing
- **joblib** - Model serialization and deserialization
- **imbalanced-learn** - Handling class imbalance in predictions
- **Pydantic** - Data validation using Python type annotations

## Available Models

The service currently supports three pre-trained machine learning models:

1. **Diabetes Prediction** - Random Forest Classifier
2. **Heart Attack Prediction** - AdaBoost Classifier
3. **Stroke Prediction** - Support Vector Machine (SVM)

For detailed model documentation, see the [model documentation directory](./documentation/).

## Prerequisites

- **Python 3.8+**
- **pip** (Python package manager)

## Installation

1. Create and activate a Python virtual environment:

```bash
python -m venv venv

# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

## Configuration

The service is configured using environment variables. Create a `.env` file in the `health-prediction-service/` directory:

```bash
cp .env.example .env
```

### Environment Variables

- **ALLOWED_ORIGINS** - Comma-separated list of allowed CORS origins (e.g., `"http://localhost:5173,http://localhost:8080"`)
- **APP_HOST** - Server host address (default: `0.0.0.0`)
- **APP_PORT** - Server port (default: `5000`)
- **APP_RELOAD** - Enable hot-reloading for development (default: `False`)

## Running the Service

### Development Mode

From the `health-prediction-service/` directory:

```bash
python run.py
```

Or using uvicorn directly:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
```

The service will start and be available at `http://localhost:5000`.

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 5000
```

### Using Docker

The service is containerized and can be run via Docker Compose from the project root:

```bash
docker-compose up python
```

## API Endpoints

### Interactive API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: `http://localhost:5000/docs`
- **ReDoc**: `http://localhost:5000/redoc`
- **OpenAPI JSON**: `http://localhost:5000/openapi.json`

### List Available Models

Retrieve metadata for all available prediction models.

- **Endpoint**: `GET /api/models`
- **Response**: Array of model information objects

**Example Response:**
```json
[
  {
    "model_id": "diabetes",
    "description": "A model to predict the risk of diabetes.",
    "required_features": [
      "hba1c_level",
      "blood_glucose_level",
      "bmi",
      "age",
      "smoking_history"
    ]
  }
]
```

### Make Predictions

#### Diabetes Prediction

- **Endpoint**: `POST /api/models/diabetes`
- **Request Body**: JSON object with required features
- **Response**: Prediction result and probability

**Example Request:**
```json
{
  "hba1c_level": 6.6,
  "blood_glucose_level": 140,
  "bmi": 27.9,
  "age": 55,
  "smoking_history": 1
}
```

**Example Response:**
```json
{
  "prediction": 0,
  "probability": 0.31
}
```

#### Heart Attack Prediction

- **Endpoint**: `POST /api/models/heart-attack`
- **Request Body**: JSON object with required features
- **Response**: Prediction result and probability

**Example Request:**
```json
{
  "age": 63,
  "sex": 1,
  "cp": 3,
  "trestbps": 145,
  "chol": 233,
  "thalach": 150,
  "oldpeak": 2.3,
  "exang": 0
}
```

#### Stroke Prediction

- **Endpoint**: `POST /api/models/stroke`
- **Request Body**: JSON object with required features
- **Response**: Prediction result and probability

**Example Request:**
```json
{
  "age": 67,
  "sex": 0,
  "hypertension": 2,
  "heart_disease": 1,
  "work_type": 3,
  "avg_glucose_level": 278,
  "bmi": 39.6
}
```

## Project Structure

```
health-prediction-service/
├── app/
│   ├── main.py            # FastAPI application and route definitions
│   ├── schemas.py         # Pydantic models for request/response validation
│   ├── services.py        # Model loading and prediction logic
│   └── config.py          # Configuration and environment variable handling
├── trained_models/         # Directory containing serialized ML models (.pkl files)
├── documentation/        # Model documentation and training details
├── requirements.txt        # Python dependencies
├── run.py                 # Application entry point
└── Dockerfile             # Container configuration
```

## Model Loading

Models are loaded from the `trained_models/` directory at application startup. The service expects:

- Serialized model files (`.pkl` format)
- Models compatible with scikit-learn's `joblib` serialization
- Proper feature ordering matching the model's training data

## Error Handling

The service implements comprehensive error handling:

- **Validation Errors**: Pydantic validates request schemas and returns detailed error messages
- **Model Errors**: Graceful handling of model loading and inference failures
- **HTTP Exceptions**: Appropriate status codes and error messages

## Performance Considerations

- **Stateless Design**: No session state, enabling horizontal scaling
- **Model Caching**: Models are loaded once at startup and cached in memory
- **Async Support**: FastAPI's async capabilities for concurrent request handling

## Development

### Adding a New Model

1. Train and serialize your model to `trained_models/`
2. Add request/response schemas in `app/schemas.py`
3. Register the model in `app/services.py`
4. Add endpoint in `app/main.py`



## Additional Resources

- **Model Documentation**: See [documentation/](./documentation/) for detailed model information
- **Main Project README**: See [../README.md](../README.md) for comprehensive project documentation
