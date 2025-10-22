import React from 'react';
import { TelemetryData } from '../types/TelemetryData';

interface Props {
  telemetry: TelemetryData;
}

const TelemetryCard: React.FC<Props> = ({ telemetry }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h4>{telemetry.siteId} — {telemetry.officeId}</h4>
      <p><strong>Temperature:</strong> {telemetry.temperature}°C</p>
      <p><strong>Humidity:</strong> {telemetry.humidity}%</p>
      <p><strong>Power:</strong> {telemetry.power}W</p>
      <p><strong>Timestamp:</strong> {new Date(telemetry.timestamp).toLocaleString()}</p>
    </div>
  );
};

export default TelemetryCard;
