import React, { useEffect, useState } from 'react';
import { getTelemetry } from '../api/telemetry';
import { TelemetryData } from '../types/TelemetryData';
import TelemetryCard from '../components/TelemetryCard';

const DashboardPage: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTelemetry = async () => {
    setLoading(true);
    try {
      const response = await getTelemetry();
      setTelemetry(response.data);
    } catch (err) {
      setError('Failed to load telemetry data.');
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    fetchTelemetry();

    const socket = new WebSocket(`ws://localhost:${import.meta.env.VITE_WS_PORT}`);

      // ✅ Confirmación visual de conexión
    socket.onopen = () => {
      console.log('✅ WebSocket connection established');
    };
    socket.onerror = err => {
      console.error('❌ WebSocket error:', err);
    };
    socket.onmessage = event => {
      const raw = JSON.parse(event.data);

    const mapped: TelemetryData = {
      siteId: raw.siteId,
      officeId: raw.officeId,
      timestamp: raw.timestamp,
      temperature: raw.temperature,
      humidity: raw.humidity,
      power: raw.power,
      co2: raw.co2,
      occupancy: raw.occupancy,
    };

      setTelemetry(prev => [mapped, ...prev.slice(0, 49)]);
    };

    return () => socket.close();
    
}, []);


  return (
    <div>
      <h2>Telemetry Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {telemetry.length === 0 ? (
        <p>No telemetry data found.</p>
      ) : (
        <div className="telemetry-table">
          <div className="telemetry-header">
            <span>Site</span>
            <span>Office</span>
            <span>Temperature (°C)</span>
            <span>Humidity (%)</span>
            <span>Power (W)</span>
            <span>CO₂ (ppm)</span>
            <span>Person Count</span>
            <span>Timestamp</span>
          </div>

          {telemetry.map(entry => (
            <TelemetryCard key={`${entry.siteId}-${entry.officeId}-${entry.timestamp}-${entry.temperature}`} telemetry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
