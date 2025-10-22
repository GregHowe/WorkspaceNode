import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Ajusta si usas otro puerto
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
