import axios from 'axios';

/**
 * Fallback base URL used during local development when VITE_API_BASE_URL is not set.
 */
const DEFAULT_BASE_URL = 'http://localhost:5000/api';

/**
 * Singleton Axios HTTP client configured with project environment variables.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
