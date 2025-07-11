// src/lib/axiosInstance.js
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosInstance = axios.create({
  baseURL: 'https://grand-royel-server.vercel.app/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
