import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend.thalassaemiasamity.org/api/',
  //baseURL: 'http://127.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // store.dispatch(logout());
      window.location.href = '/login';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('roles');
      localStorage.removeItem('permissions');
    }

  }
)

export default api;
