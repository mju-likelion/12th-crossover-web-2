import axios from "axios";
export const Axios = axios.create({
    baseURL: 'api.likelion-crossover-team2.com',
    withCredentials: true,
});