import React from 'react';
import { Reservation } from '../types/Reservation';

interface Props {
  reservation: Reservation;
}

const ReservationCard: React.FC<Props> = ({ reservation }) => {
  return (
    <>
    <div className="reservation-row">
      <div className="cell">{reservation.emailClient}</div>
      <div className="cell">{reservation.reservationDate}</div>
      <div className="cell">{reservation.space.name}</div>
      <div className="cell">{reservation.startTime}</div>
      <div className="cell">{reservation.endTime}</div>
    </div>
    </>
  );
};

export default ReservationCard;
