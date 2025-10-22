import { validateReservation } from '../utils/validateReservation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Props {
  onReservationCreated: () => void;
}

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const ReservationForm: React.FC<Props> = ({ onReservationCreated }) => {
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const [spaces, setSpaces] = useState([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState('');

  useEffect(() => {
  axios.get(`${apiUrl}/api/spaces`, {
    headers: {
      'x-api-key': apiKey
    }
  })
  .then((res) => {
    setSpaces(res.data.data);
    console.log('Espacios cargados:', res.data.data);
  })
  .catch((err) => {
    console.error('Error cargando espacios', err);
  });
}, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
  const error = validateReservation({ user, date, startTime, endTime, spaceId: selectedSpaceId });
  if (error) {
    setMessage(error);
    return;
  }

    try {
      await axios.post(
        `${apiUrl}/api/reservations`,
        { user, date, startTime, endTime, spaceId: Number(selectedSpaceId) },
        { headers: { 'x-api-key': apiKey } }
      );
      setMessage('✅ Reserva creada exitosamente.');
      setUser('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setSelectedSpaceId('');
      onReservationCreated();
    } catch (error) {
      console.error('Error al crear la reserva:', error);
        if (error.response && error.response.data && error.response.data.message) {
            setMessage(`❌ ${error.response.data.message}`);
        } else {
            setMessage('❌ Error al crear la reserva. Intenta nuevamente.');
        }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h3>Crear Reserva</h3>
      
      <span>User: <input type="text" placeholder="Usuario" value={user} onChange={e => setUser(e.target.value)} /></span>
      <span>Date: <input type="date" value={date} onChange={e => setDate(e.target.value)} /></span>
      <span>Start Time: <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} /></span>
      <span>End Time:<input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} /></span>
      <span>Space: &nbsp;
        <select          value={selectedSpaceId}           onChange={(e) => setSelectedSpaceId(e.target.value)}           >
          <option value="">Selecciona un espacio</option>
          {spaces.map((space) => (
            <option key={space.id} value={space.id}>
              {space.name} ({space.type}) - Capacidad: {space.capacity}
            </option>
          ))}
        </select>
      </span>
      
      <button type="submit">Reservar</button>
      {message && (
            <p className={message.startsWith('✅') ? 'success' : 'error'}>
            {message}
            </p>
      )}
    </form>
  );
};

export default ReservationForm;