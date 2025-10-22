import api from './axios';

export const getReservations = async (page: number = 1, limit: number = 5) => {
  const response = await api.get(`/api/reservations?page=${page}&limit=${limit}`);
  return response.data;
};