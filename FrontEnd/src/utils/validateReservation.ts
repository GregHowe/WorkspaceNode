import { getLocalDate } from './getLocalDate';

export interface ReservationInput {
  emailClient: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  spaceId: string;
}

export function validateReservation(input: ReservationInput): string | null {
  const { emailClient, reservationDate, startTime, endTime, spaceId } = input;
  debugger;
  // Validación de campos obligatorios
  const missingFields: string[] = [];
  if (!emailClient) missingFields.push('Email Client');
  if (!reservationDate) missingFields.push('Reservation Date');
  if (!startTime) missingFields.push('Start Time');
  if (!endTime) missingFields.push('End Time');
  if (!spaceId) missingFields.push('Space');

  if (missingFields.length > 0) {
    return `⚠️ The following fields are missing: ${missingFields.join(', ')}.`;
  }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailClient.trim()) return '❌ Email is required';
  if (!emailRegex.test(emailClient)) return '❌ Invalid email format';

  // Validación de fecha (evita errores por zona horaria)
  const today = new Date();
  const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const selectedDate = getLocalDate(reservationDate); // ← convierte "YYYY-MM-DD" a fecha local

  if (selectedDate < todayLocal) {
    return '⚠️ The date cannot be earlier than today.';
  }

  // Validación de rango horario
  if (startTime >= endTime) {
    return '⚠️ The start time must be earlier than the end time.';
  }

  // Validación de espacio
  const spaceIdNum = Number(spaceId);
  if (isNaN(spaceIdNum) || spaceIdNum <= 0) {
    return '⚠️ The selected space is not valid.';
  }

  return null; // ✅ Todo válido
}
