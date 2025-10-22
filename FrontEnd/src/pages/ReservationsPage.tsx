import React, { useEffect, useState } from 'react';
import { getReservations } from '../api/reservations';
import { Reservation } from '../types/Reservation';
import ReservationCard from '../components/ReservationCard';
import ReservationForm from '../components/ReservationForm';

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
  <div className="container">
    <h2>Reservations</h2>

    {/* Formulario para crear nueva reserva */}
    <ReservationForm onReservationCreated={() => setPage(1)} />

  <hr className="divider" />
  <h3 className="section-title">Reservas Existentes</h3>


{/* Encabezado de columnas */}
<div className="reservation-row header">
  <div className="cell"><strong>Usuario</strong></div>
  <div className="cell"><strong>Fecha</strong></div>
  <div className="cell"><strong>Espacio</strong></div>
  <div className="cell"><strong>Inicio</strong></div>
  <div className="cell"><strong>Fin</strong></div>
</div>

    {/* Lista de reservas */}
    {reservations.length === 0 ? (
      <p>No reservations found.</p>
    ) : (
      
      reservations.map(reservation => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))
    )}

    {/* Paginación */}
    <div style={{ marginTop: '1rem' }}>
      <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
      <span style={{ margin: '0 1rem' }}>Page {page}</span>
      <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </div>
  </div>
);

};

export default ReservationsPage;
