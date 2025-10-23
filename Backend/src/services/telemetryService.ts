import { AppDataSource } from '../config/data-source';
import { Telemetry } from '../entities/Telemetry';
import { Between } from 'typeorm';
import { queryGroupByDay } from '../queries/telemetry/groupByDay';
import { queryGroupBySiteId } from '../queries/telemetry/groupBySiteId';
import { queryGroupByOfficeId } from '../queries/telemetry/groupByOfficeId';
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

const groupByQueryMap: Record<string, string> = {
  day: queryGroupByDay,
  siteId: queryGroupBySiteId,
  officeId: queryGroupByOfficeId
};

export const getTelemetryRawGrouped = async (
  groupBy: string,
  siteId: string,
  officeId: string,
  startDate: string,
  endDate: string
) => {
  const query = groupByQueryMap[groupBy];
  if (!query) {
    throw new Error(`Unsupported groupBy: ${groupBy}`);
  }

  const baseParams = [siteId, officeId, startDate, endDate];
  return AppDataSource.manager.query(query, baseParams);
};

export const getTelemetryRaw = async (
  siteId: string,
  officeId: string,
  startDate?: string,
  endDate?: string
) => {
  const where: any = { siteId, officeId };
  if (startDate && endDate) {
    where.ts = Between(new Date(startDate), new Date(endDate));
  }

  const rows = await AppDataSource.manager.find(Telemetry, {
    where,
    order: { ts: 'DESC' },
    take: 50,
  });

  return rows.map(mapTelemetryRow);
  
};
