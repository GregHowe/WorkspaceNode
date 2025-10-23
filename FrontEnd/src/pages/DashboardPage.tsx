import React, { useEffect, useState } from 'react';
import { getTelemetry } from '../api/telemetry';
import { TelemetryData } from '../types/TelemetryData';
import TelemetryCard from '../components/TelemetryCard';

const DashboardPage: React.FC = () => {
  const [siteId, setSiteId] = useState('SITE_A');
  const [officeId, setOfficeId] = useState('OFFICE_1');
  const [telemetry, setTelemetry] = useState<TelemetryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [groupBy, setGroupBy] = useState('date');

  // const fetchTelemetry = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getTelemetry(siteId, officeId);
  //     setTelemetry(response);
  //   } catch (err) {
  //     setError('Failed to load telemetry data.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleFilterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(false);

  try {
    const response = await getTelemetry({
      siteId,
      officeId,
      startDate,
      endDate,
      groupBy,
    });
    setTelemetry(response.data);
  } catch (err) {
    setError(true);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const loadDefaultTelemetry = async () => {
    try {
      const response = await getTelemetry({
        siteId: 'SITE_A',
        officeId: 'OFFICE_1',
        startDate: '2025-10-22',
        endDate: '2025-10-22',
        groupBy: 'timestamp', // ✅ más abajo explico esto
      });
      setTelemetry(response.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  loadDefaultTelemetry();
}, []);


  return (
    <div>
      <h2>Telemetry Dashboard</h2>

      {/* <div style={{ marginBottom: '1rem' }}>
        <label>
          Site ID:
          <input value={siteId} onChange={e => setSiteId(e.target.value)} />
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Office ID:
          <input value={officeId} onChange={e => setOfficeId(e.target.value)} />
        </label>
      </div> */}

    <form onSubmit={handleFilterSubmit} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <label>
        Site ID:
        <input
          type="text"
          value={siteId}
          onChange={(e) => setSiteId(e.target.value)}
          required
        />
      </label>

      <label>
        Office ID:
        <input
          type="text"
          value={officeId}
          onChange={(e) => setOfficeId(e.target.value)}
          required
        />
      </label>

      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>

      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>

      <label>
        Group By:
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="date">Fecha</option>
          <option value="hour">Hora</option>
        </select>
      </label>

      <button type="submit">Filtrar</button>
    </form>



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
      <span>Battery (%)</span>
      <span>Timestamp</span>
    </div>

    {telemetry.map(entry => (
      <TelemetryCard key={entry.timestamp} telemetry={entry} />
    ))}
  </div>
)}


    </div>
  );
};

export default DashboardPage;
