import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g ==> http://localhost:5000/api
//   withCredentials: true, // if you’re using cookies/JWT
});

export default axiosInstance;
