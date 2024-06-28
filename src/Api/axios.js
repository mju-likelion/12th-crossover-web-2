import axios from "axios";

const Axios = axios.create({
  baseURL: 'https://api.likelion-crossover-team2.com',
  withCredentials: true,
});

export default Axios;
