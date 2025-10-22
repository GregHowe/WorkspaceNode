import { AppDataSource } from '../config/data-source';
import { Reservation } from '../entities/Reservation';
import { Between, LessThan, MoreThan } from 'typeorm';
import { getWeekRange, isWeeklyLimitExceeded } from '../utils/reservationRules';
import { MAX_RESERVATIONS_PER_WEEK } from '../config/constants';

const reservationRepo = AppDataSource.getRepository(Reservation);

// 🔹 Nuevo helper para contar reservas semanales
export const fetchReservationCount = async (
  user: string,
  start: Date,
  end: Date
): Promise<number> => {
  return await reservationRepo.count({
    where: {
      user,
      date: Between(start.toISOString(), end.toISOString())
    }
  });
};

// 🔹 Refactor: ahora usa fetchReservationCount
export const checkWeeklyLimit = async (
  email: string,
  date: Date
): Promise<boolean> => {
  const { weekStart, weekEnd } = getWeekRange(date);
  const count = await fetchReservationCount(email, weekStart, weekEnd);
  return count >= MAX_RESERVATIONS_PER_WEEK;
};

export const checkOverlap = async (
  spaceId: number,
  date: string,
  startTime: string,
  endTime: string
) => {
  return await reservationRepo.findOne({
    where: {
      space: { id: spaceId },
      date,
      startTime: LessThan(endTime),
      endTime: MoreThan(startTime)
    }
  });
};

export const createReservationRecord = async (data: {
  user: string;
  date: string;
  startTime: string;
  endTime: string;
  spaceId: number;
}) => {
  const reservation = reservationRepo.create({
    user: data.user,
    date: data.date,
    startTime: data.startTime,
    endTime: data.endTime,
    space: { id: data.spaceId }
  });

  return await reservationRepo.save(reservation);
};

export const deleteReservationById = async (id: number) => {
  const reservation = await reservationRepo.findOne({ where: { id } });
  if (!reservation) return null;
  await reservationRepo.remove(reservation);
  return reservation;
};
