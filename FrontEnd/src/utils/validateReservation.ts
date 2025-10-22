import { getLocalDate } from './getLocalDate';

export interface ReservationInput {
  user: string;
  date: string;
  startTime: string;
  endTime: string;
  spaceId: string;
}

export function validateReservation(input: ReservationInput): string | null {
  const { user, date, startTime, endTime, spaceId } = input;

  // Validación de campos obligatorios
  const missingFields: string[] = [];
  if (!user) missingFields.push('User');
  if (!date) missingFields.push('Date');
  if (!startTime) missingFields.push('Start Time');
  if (!endTime) missingFields.push('End Time');
  if (!spaceId) missingFields.push('Space');

  if (missingFields.length > 0) {
    return `⚠️ The following fields are missing: ${missingFields.join(', ')}.`;
  }

  // Validación de fecha (evita errores por zona horaria)
  const today = new Date();
  const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const selectedDate = getLocalDate(date); // ← convierte "YYYY-MM-DD" a fecha local

  if (selectedDate < todayLocal) {
    return '⚠️ La fecha no puede ser anterior a hoy.';
  }

  // Validación de rango horario
  if (startTime >= endTime) {
    return '⚠️ La hora de inicio debe ser menor que la hora de fin.';
  }

  // Validación de espacio
  const spaceIdNum = Number(spaceId);
  if (isNaN(spaceIdNum) || spaceIdNum <= 0) {
    return '⚠️ El espacio seleccionado no es válido.';
  }

  return null; // ✅ Todo válido
}
