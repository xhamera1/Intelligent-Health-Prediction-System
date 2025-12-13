# Frontend Application

The frontend is a modern **React 19** single-page application built with **TypeScript** and **Vite**, providing an intuitive user interface for the Intelligent Health Prediction System. It offers a responsive, accessible design using Material-UI components and implements comprehensive state management for seamless user interactions.

## Key Features

- **Modern React Architecture**: Built with React 19, TypeScript, and functional components with hooks
- **Responsive Design**: Material-UI (MUI) component library for consistent, mobile-friendly UI
- **Client-Side Routing**: React Router for navigation and protected routes
- **State Management**: TanStack Query for server state and React Context for application state
- **Form Handling**: React Hook Form for efficient form validation and submission
- **Authentication**: JWT token-based authentication with secure storage
- **Data Visualization**: MUI X Charts for health trend visualizations
- **Type Safety**: Full TypeScript coverage for enhanced developer experience

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **Material-UI (MUI) v7** - Component library and design system
- **React Router v7** - Client-side routing
- **TanStack Query v4** - Data fetching, caching, and synchronization
- **React Hook Form** - Form state management and validation
- **Axios** - HTTP client for API communication
- **Day.js** - Date manipulation and formatting
- **React Markdown** - Markdown rendering for AI-generated content

## Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)

## Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` with hot module replacement enabled.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript compilation + Vite build) |
| `npm run build:dev` | Build for development environment |
| `npm run build:prod` | Build for production environment |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code with Prettier |
| `npm test` | Run tests with Vitest |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run test:coverage` | Run tests with coverage report |

## Environment Configuration

The application uses environment variables prefixed with `VITE_` for configuration.

### Development Setup

Create a `.env.development` file in the `frontend/` directory:

```env
VITE_BACKEND_URL=http://localhost:8080
VITE_ENV=development
VITE_ENABLE_DEBUG=true
```

### Production Setup

Create a `.env.production` file in the `frontend/` directory:

```env
VITE_BACKEND_URL=https://api.yourdomain.com
VITE_ENV=production
VITE_ENABLE_DEBUG=false
```

> **Note**: Environment variables must be prefixed with `VITE_` to be accessible in the application. Restart the dev server after changing environment variables.

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── sidebar/        # Navigation components
│   │   ├── predictionHistory/ # History-related components
│   │   └── ...             # Other shared components
│   ├── pages/              # Page-level components
│   │   ├── Home.tsx        # Dashboard/home page
│   │   ├── Login.tsx       # Authentication page
│   │   ├── Signup.tsx      # Registration page
│   │   ├── Account.tsx     # User account management
│   │   └── PredictionHistory.tsx # Prediction history view
│   ├── routes/             # Route configurations
│   │   ├── ProtectedRoutes.tsx # Authentication guard
│   │   └── QuestionnaireRoutes.tsx # Questionnaire routing
│   ├── contexts/           # React context providers
│   │   ├── ApplicationContextProvider.tsx # App-wide state
│   │   └── ThemeContextProvider.tsx # Theme management
│   ├── config/             # Configuration files
│   │   └── api.ts          # API endpoint configuration
│   ├── utils/              # Utility functions and types
│   ├── App.tsx             # Root component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── .env.development        # Development environment variables
├── .env.production         # Production environment variables
└── package.json            # Dependencies and scripts
```

## Key Application Features

### Authentication Flow

- **Login**: JWT token-based authentication
- **Signup**: User registration with validation
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Secure token storage and automatic refresh

### Health Questionnaires

The application provides interactive forms for:
- **Diabetes Risk Assessment**: HbA1c, blood glucose, BMI, age, smoking history
- **Heart Attack Risk Assessment**: Clinical parameters (CP, blood pressure, cholesterol, etc.)
- **Stroke Risk Assessment**: Demographics, hypertension, heart disease, glucose levels
- **Habits Assessment**: Lifestyle factors and wellness evaluation

### Prediction Results

Each prediction displays:
- **Risk Probability**: Percentage-based risk assessment
- **Input Data Summary**: Complete breakdown of submitted parameters
- **AI Recommendations**: Personalized health advice generated by Google Gemini

### User Dashboard

- **Home Dashboard**: Personalized welcome, recent predictions, health trends
- **Prediction History**: Complete history with filtering and search
- **Account Management**: Profile updates, demographic data management

## State Management

### Server State (TanStack Query)

- Automatic caching and synchronization
- Background refetching
- Optimistic updates
- Error handling and retry logic

### Application State (React Context)

- **ApplicationContext**: User authentication state, user data
- **ThemeContext**: Dark/light mode preferences

## API Integration

The frontend communicates with the backend REST API using Axios. All API calls are configured in `src/config/api.ts` and use TanStack Query for state management.

### Authentication

- Tokens are stored securely and included in request headers
- Automatic token refresh on expiration
- Logout clears all stored authentication data

## Styling & Theming

- **Material-UI Theme**: Customizable theme with dark/light mode support
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG-compliant components and ARIA labels

## Development Best Practices

- **TypeScript**: Strict type checking enabled
- **Component Composition**: Reusable, composable components
- **Error Boundaries**: Graceful error handling
- **Code Splitting**: Lazy loading for route-based code splitting
- **Performance**: React.memo and useMemo for optimization

## Building for Production

```bash
npm run build:prod
```

The production build will be output to the `dist/` directory, optimized for:
- Code minification
- Tree shaking
- Asset optimization
- Source maps (optional)

## Additional Resources

For comprehensive project documentation, see the main [README.md](../README.md) in the project root.
