import { startOfWeek, endOfWeek } from 'date-fns';

export const getWeekRange = (date: Date) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  return { weekStart, weekEnd };
};

export const MAX_RESERVATIONS_PER_WEEK = 3;

export const isWeeklyLimitExceeded = (count: number) => {
  return count >= MAX_RESERVATIONS_PER_WEEK;
};
