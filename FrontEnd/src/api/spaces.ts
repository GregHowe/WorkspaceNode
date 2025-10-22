// src/api/spaces.ts
import api from './axios';

export const getSpaces = async () => {
  const response = await api.get('/api/spaces');
  return response.data;
};
