import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // only if your backend uses cookies or authentication
});
export default axiosInstance;
