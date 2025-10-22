import api from './axios';

export const getReservations = async (page: number = 1) => {
  const response = await api.get(`/api/reservations?page=${page}`);
  return response.data;
};
