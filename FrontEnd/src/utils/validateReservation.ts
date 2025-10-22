export interface ReservationInput {
  user: string;
  date: string;
  startTime: string;
  endTime: string;
  spaceId: string;
}

export function validateReservation(input: ReservationInput): string | null {
  const { user, date, startTime, endTime, spaceId } = input;

  if (!user || !date || !startTime || !endTime || !spaceId) {
    return '⚠️ Todos los campos son obligatorios.';
  }

  const today = new Date();
  const selectedDate = new Date(date);
  if (selectedDate < today) {
    return '⚠️ La fecha no puede ser anterior a hoy.';
  }

  if (startTime >= endTime) {
    return '⚠️ La hora de inicio debe ser menor que la hora de fin.';
  }

  const spaceIdNum = Number(spaceId);
  if (isNaN(spaceIdNum) || spaceIdNum <= 0) {
    return '⚠️ El ID del espacio debe ser un número válido.';
  }

  return null; // ✅ Todo válido
}
