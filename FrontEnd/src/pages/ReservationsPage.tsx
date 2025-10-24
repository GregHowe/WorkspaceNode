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
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const maxPage = Math.ceil(total / limit);

    const fetchReservations = async () => {
      try {
        const response = await getReservations(page, limit);
        setReservations(response.data);
        setTotal(response.pagination.total); 
      } catch (err) {
        setError('Failed to load reservations.');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    setLoading(true);
    fetchReservations(page, limit);
  }, [page, limit]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

return (
  <div className="container">
    <h2>Reservations</h2>

    {/* Formulario para crear nueva reserva */}
    <ReservationForm onReservationCreated={() => { 
      setPage(1);
      setLoading(true);
      fetchReservations(1, limit);
      }} />

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

      <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
        <option value={5}>5 por página</option>
        <option value={10}>10 por página</option>
        <option value={20}>20 por página</option>
      </select>

      <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
      <span style={{ margin: '0 1rem' }}>Page {page} of {maxPage} — {total} reservas</span>
      <button        onClick={() => setPage(prev => prev + 1)}        disabled={page >= maxPage}>
        Next
      </button>
    </div>
  </div>
);

};

export default ReservationsPage;
