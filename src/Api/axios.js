import axios from "axios";
export const Axios = axios.create({
    baseURL: 'https://api.likelion-crossover-team2.com',
    withCredentials: true,
});

