import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('taskflow_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de respuesta: si el token expiró o es inválido (401), limpia la sesión y redirige al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('taskflow_token');
      window.location.hash = '#/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Cierra la sesión activa: invalida el token en el backend Laravel Sanctum
 * y limpia el almacenamiento local (localStorage).
 */
export const logoutSession = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.warn('Error al revocar token en el backend:', error);
  } finally {
    localStorage.removeItem('taskflow_token');
    window.location.hash = '#/login';
  }
};

export default api;
