import { Router } from 'express';
import { getReservations, createReservation, deleteReservation } from '../controllers/ReservationController';

const router = Router();

router.get('/', getReservations);
router.post('/', createReservation);
router.delete('/:id', deleteReservation);

export default router;