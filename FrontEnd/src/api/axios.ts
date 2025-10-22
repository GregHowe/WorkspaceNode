import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


const api = axios.create({
  baseURL: BASE_URL, 
  headers: {
     'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
});

export default api;
