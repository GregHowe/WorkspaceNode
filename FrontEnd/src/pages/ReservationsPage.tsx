import React, { useEffect, useState } from 'react';
import { getReservations } from '../api/reservations';
import { Reservation } from '../types/Reservation';
import ReservationCard from '../components/ReservationCard';

const ReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getReservations(page);
        setReservations(response.data);
      } catch (err) {
        setError('Failed to load reservations.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        reservations.map(reservation => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))
      )}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
        <span style={{ margin: '0 1rem' }}>Page {page}</span>
        <button onClick={() => setPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ReservationsPage;
