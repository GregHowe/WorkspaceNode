export function getLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}
