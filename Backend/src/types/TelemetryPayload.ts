export interface TelemetryPayload {
  ts: string;
  temp_c: number;
  humidity_pct: number;
  co2_ppm: number;
  occupancy: number;
  power_w: number;
}
