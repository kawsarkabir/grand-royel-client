import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // only if your backend uses cookies or authentication
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or however you store it
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axiosInstance;
