function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

export const API_BASE_URL = getApiBaseUrl();

export function apiUrl(path: string): string {
  if (!path) {
    throw new Error('API path cannot be empty');
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

export const ENDPOINTS = {
  PREDICTIONS: apiUrl('/api/predictions'),
  PREDICTION_HISTORY: apiUrl('/api/prediction-history'),
  USERS: apiUrl('/api/users'),
  USER_DEMOGRAPHICS: apiUrl('/api/users/demographics'),
  LOGIN: apiUrl('/auth/login'),
  ADMIN_USERS: apiUrl('api/admin_users'),
  NEW_REGISTRATIONS: apiUrl('api/admin_users/last30Days')
} as const;
