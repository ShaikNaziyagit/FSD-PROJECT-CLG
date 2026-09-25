/**
 * Intelligent API Base URL resolver supporting:
 * 1. Vite environment variables (VITE_API_URL)
 * 2. Localhost development (with Vite dev proxy or port 5000)
 * 3. Render full-stack monolith (same-origin /api)
 * 4. Vercel decoupled client (directly routes to Render backend https://fsd-project-clg.onrender.com/api)
 */
const resolveApiBaseUrl = () => {
  // If explicitly injected via build env
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;

    // Localhost dev server
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return '/api';
    }

    // Monolithic deployment on Render
    if (hostname.includes('onrender.com')) {
      return '/api';
    }

    // Deployed on Vercel or any other external domain -> connect to Render production backend
    return 'https://fsd-project-clg.onrender.com/api';
  }

  return 'https://fsd-project-clg.onrender.com/api';
};

export const API_BASE_URL = resolveApiBaseUrl();

/**
 * Universal API Client with automatic JWT Bearer token attachment and error parsing
 */
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('campusos_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${cleanEndpoint}`;

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Clear token only if 401 occurs on a protected resource, never during login/registration
      if (
        response.status === 401 &&
        !cleanEndpoint.startsWith('/auth/login') &&
        !cleanEndpoint.startsWith('/auth/register')
      ) {
        localStorage.removeItem('campusos_token');
        localStorage.removeItem('campusos_user');
      }
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error(`[API Network Error]: Could not reach ${url}.`, error);
      throw new Error(
        'Cannot connect to CampusOS Server. The backend may be booting up from sleep mode (~30s cold start on free hosting). Please wait a few seconds and try again.'
      );
    }
    console.error(`[API Error: ${options.method || 'GET'} ${cleanEndpoint}]:`, error.message);
    throw error;
  }
};

export const api = {
  get: (url, options) => request(url, { method: 'GET', ...options }),
  post: (url, body, options) => request(url, { method: 'POST', body, ...options }),
  put: (url, body, options) => request(url, { method: 'PUT', body, ...options }),
  delete: (url, options) => request(url, { method: 'DELETE', ...options }),
};

export default api;
