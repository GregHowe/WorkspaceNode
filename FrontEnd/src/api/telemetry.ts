import api from './axios';

export const getTelemetry = async () => {
  const url = `/api/telemetry`;
  return await api.get(url);
};

