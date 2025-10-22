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

    if (!user || !date || !startTime || !endTime || !spaceId) {
      setMessage('Todos los campos son obligatorios.');
      return;
    }

    try {
      await axios.post(
        `${apiUrl}/reservations`,
        { user, date, startTime, endTime, spaceId: Number(spaceId) },
        { headers: { 'x-api-key': apiKey } }
      );
      setMessage('Reserva creada exitosamente.');
      setUser('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setSpaceId('');
      onReservationCreated(); // ← notifica al padre
    } catch (error) {
      setMessage('Error al crear la reserva.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h3>Crear Reserva</h3>
      <input type="text" placeholder="Usuario" value={user} onChange={e => setUser(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
      <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
      <input type="number" placeholder="ID del espacio" value={spaceId} onChange={e => setSpaceId(e.target.value)} />
      <button type="submit">Reservar</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ReservationForm;