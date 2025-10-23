import React from 'react';
import { TelemetryData } from '../types/TelemetryData';

interface Props {
  telemetry: TelemetryData;
}

const TelemetryCard: React.FC<Props> = ({ telemetry }) => {
  return (
    <div className="telemetry-row">
      <span>{telemetry.siteId}</span>
      <span>{telemetry.officeId}</span>
      <span>{telemetry.temperature}</span>
      <span>{telemetry.humidity}</span>
      <span>{telemetry.power}</span>
      <span>{telemetry.co2}</span>
      <span>{telemetry.occupancy}</span>
      <span>
        {telemetry.timestamp ? new Date(telemetry.timestamp).toLocaleString() : '–'}
      </span>
    </div>
  );
};

export default TelemetryCard;
