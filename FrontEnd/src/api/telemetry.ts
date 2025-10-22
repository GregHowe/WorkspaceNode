import api from './axios';

export const getTelemetry = async (siteId: string, officeId: string) => {
  const response = await api.get(`/api/telemetry?siteId=${siteId}&officeId=${officeId}`);
  return response.data;
};
