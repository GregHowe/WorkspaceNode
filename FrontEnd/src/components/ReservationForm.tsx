import { validateEmail } from '../utils/emailValidation';
import { validateReservation } from '../utils/validateReservation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { submitReservation } from '../handlers/submitReservation';
import SpaceSelector from '../components/SpaceSelector';

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

    await submitReservation(reservationPayload, apiUrl, apiKey, setMessage, () => {
      setEmailClient('');
      setReservationDate('');
      setStartTime('');
      setEndTime('');
      setSelectedSpaceId('');
      onReservationCreated();
    });

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
          setEmailError(validateEmail(value));
        }}
        className={emailError ? 'invalid' : ''}
      />
    </span>
    {emailError && <p className="error">{emailError}</p>}

      <span>Date: <input type="date" value={reservationDate} onChange={e => setReservationDate(e.target.value)} /></span>
      <span>Start Time: <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} /></span>
      <span>End Time:<input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} /></span>
      <span>Space: &nbsp;
      <SpaceSelector
        spaces={spaces}
        selectedSpaceId={selectedSpaceId}
        onChange={setSelectedSpaceId}
      />
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