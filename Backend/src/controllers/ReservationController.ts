import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Reservation } from '../entities/Reservation';
import { checkWeeklyLimit, checkOverlap, createReservationRecord } from '../services/reservationService';
import { deleteReservationById } from '../services/reservationService';
import { handleError } from '../utils/errorHandler';

const reservationRepository = AppDataSource.getRepository(Reservation);

export const getReservations = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [reservations, total] = await reservationRepository.findAndCount({
      relations: ['space'],
      skip,
      take: limit,
    });

    res.status(200).json({
      ok: true,
      data: reservations,
      pagination: {
        page,
        limit,
        total
      }
    });
  } catch (error) {
     handleError(res, error, 'Error fetching reservations');
  }
};


export const createReservation = async (req: Request, res: Response) => {
  try {
    const { user, date, spaceId, startTime, endTime } = req.body;
    const reservationDate = new Date(date);

  const exceeded = await checkWeeklyLimit(user, reservationDate);
  if (exceeded) {
    return res.status(400).json({ ok: false, msg: 'Weekly limit exceeded' });
  }

    const overlapping = await checkOverlap(spaceId, date, startTime, endTime);
    if (overlapping) {
      return res.status(400).json({ ok: false, msg: 'Schedule conflict detected' });
    }

    const saved = await createReservationRecord({ user, date, startTime, endTime, spaceId });
    res.status(201).json({ ok: true, data: saved });
  } catch (error) {
      handleError(res, error, 'Error creating reservation');
  }
};


export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteReservationById(Number(id));

    if (!deleted) {
      return res.status(404).json({ ok: false, msg: 'Reservation not found' });
    }

    res.status(200).json({ ok: true, msg: 'Reservation deleted successfully' });
  } catch (error) {
     handleError(res, error, 'EçError deleting reservation');
  }
};

