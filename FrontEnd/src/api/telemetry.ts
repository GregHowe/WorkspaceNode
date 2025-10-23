import api from './axios';
/*
export const getTelemetry = async (siteId: string, officeId: string) => {
  const response = await api.get(`/api/telemetry?siteId=${siteId}&officeId=${officeId}`);
  return response.data;
};
*/
//fetchTelemetryData

export const getTelemetry = async ({ siteId, officeId, startDate, endDate, groupBy }) => {
  const url = `/api/telemetry?site=${siteId}&deviceId=${officeId}&startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`;
  return await api.get(url);
};

