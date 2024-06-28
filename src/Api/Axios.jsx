import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: 'https://api.likelion-crossover-team2.com',
  withCredentials: true,
});

Axios.interceptors.request.use((config) => {
  const token = Cookies.get('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default Axios;
