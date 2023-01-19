import axios from 'axios';

const API = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
    withCredentials: true
});

export default API;
