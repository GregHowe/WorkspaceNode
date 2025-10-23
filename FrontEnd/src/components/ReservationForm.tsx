import { validateReservation } from '../utils/validateReservation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Props {
  onReservationCreated: () => void;
}

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const ReservationForm: React.FC<Props> = ({ onReservationCreated }) => {
  const [emailClient, setEmailClient] = useState('');
  const [emailError, setEmailError] = useState('');
  const [reservationDate, setReservationDate] = useState('');
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
        
      const error = validateReservation({ emailClient, reservationDate, startTime, endTime, spaceId: selectedSpaceId });
      if (error) {
        setMessage(error);
        return;
      }

    const reservationPayload = {
      emailClient,
      reservationDate,
      startTime,
      endTime,
      spaceId: Number(selectedSpaceId)
    };

    try {
        await axios.post(`${apiUrl}/api/reservations`, reservationPayload, {
              headers: { 'x-api-key': apiKey }
            });
        setMessage('✅ Reservation created successfully.');
        setEmailClient('');
        setReservationDate('');
        setStartTime('');
        setEndTime('');
        setSelectedSpaceId('');
        onReservationCreated();
      } catch (error) {
        console.error('❌ Error al crear la reserva:', error);
        const backendMessage = error.response?.data?.msg;
        if (backendMessage === 'Weekly limit exceeded') {
            setMessage('⚠️ You cannot make more than 3 reservations per week.');
        } else if (backendMessage) {
            setMessage(`❌  Business error: ${backendMessage}`);
        } else {
            setMessage('❌ Technical error while creating the reservation. Please try again.');
        }
      }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h3>Crear Reserva</h3>
      
    <span>Email Client: 
      <input
        type="text"
        placeholder="Email Client"
        value={emailClient}
        onChange={e => {
          const value = e.target.value;
          setEmailClient(value);

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value.trim()) {
            setEmailError('❌ Email is required');
          } else if (!emailRegex.test(value)) {
            setEmailError('❌ Invalid email format');
          } else {
            setEmailError('');
          }
        }}
        className={emailError ? 'invalid' : ''}
      />
    </span>
    {emailError && <p className="error">{emailError}</p>}

      <span>Date: <input type="date" value={reservationDate} onChange={e => setReservationDate(e.target.value)} /></span>
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