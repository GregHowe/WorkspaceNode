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
  const [spaceId, setSpaceId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  const error = validateReservation({ user, date, startTime, endTime, spaceId });
  if (error) {
    setMessage(error);
    return;
  }

    try {
      await axios.post(
        `${apiUrl}/reservations`,
        { user, date, startTime, endTime, spaceId: Number(spaceId) },
        { headers: { 'x-api-key': apiKey } }
      );
      setMessage('✅ Reserva creada exitosamente.');
      setUser('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setSpaceId('');
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
      <span>Space<input type="number" placeholder="ID del espacio" value={spaceId} onChange={e => setSpaceId(e.target.value)} /></span>
      
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