import { AppDataSource } from '../config/data-source';
import { Telemetry } from '../entities/Telemetry';

import { isValidTelemetryPayload } from '../utils/telemetryValidator';
import { TelemetryPayload } from '../types/TelemetryPayload';
import { mapTelemetryRow } from '../utils/telemetryMapper';

export const saveTelemetry = async (siteId: string, officeId: string, data: TelemetryPayload) => {

  if (!siteId || !officeId || !isValidTelemetryPayload(data)) {
      throw new Error('Invalid telemetry payload');
    }

  const telemetry = Object.assign(new Telemetry(), {
    siteId,
    officeId,
    ts: data.ts,
    temp_c: data.temp_c,
    humidity_pct: data.humidity_pct,
    co2_ppm: data.co2_ppm,
    occupancy: data.occupancy,
    power_w: data.power_w,
  });

  return AppDataSource.manager.save(telemetry);
};


export const getTelemetryRaw = async (

) => {

  const rows = await AppDataSource.manager.find(Telemetry, {
    // where,
    order: { ts: 'DESC' },
    take: 50,
  });

  return rows.map(mapTelemetryRow);
  
};
