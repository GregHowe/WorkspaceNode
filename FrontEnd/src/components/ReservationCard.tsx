import React from 'react';
import { Reservation } from '../types/Reservation';

interface Props {
  reservation: Reservation;
}

const ReservationCard: React.FC<Props> = ({ reservation }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h4>{reservation.userName}</h4>
      <p><strong>Space ID:</strong> {reservation.spaceId}</p>
      <p><strong>Start:</strong> {reservation.startTime}</p>
      <p><strong>End:</strong> {reservation.endTime}</p>
    </div>
  );
};

export default ReservationCard;
