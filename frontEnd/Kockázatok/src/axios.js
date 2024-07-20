import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL, // Replace with your API base URL
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
