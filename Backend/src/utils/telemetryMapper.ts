import { Telemetry } from '../entities/Telemetry';

export function mapTelemetryRow(row: Telemetry) {
  return {
    siteId: row.siteId,
    officeId: row.officeId,
    timestamp: row.ts,
    temperature: row.temp_c,
    humidity: row.humidity_pct,
    co2: row.co2_ppm,
    occupancy: row.occupancy,
    power: row.power_w,
  };
}