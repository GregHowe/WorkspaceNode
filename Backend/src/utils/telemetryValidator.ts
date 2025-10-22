export const isValidTelemetryPayload = (data: any): boolean => {
  return (
    data &&
    typeof data.ts === 'string' &&
    typeof data.temp_c === 'number' &&
    typeof data.humidity_pct === 'number' &&
    typeof data.co2_ppm === 'number' &&
    typeof data.occupancy === 'number' &&
    typeof data.power_w === 'number'
  );
};
