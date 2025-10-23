import { isWeeklyLimitExceeded } from '../../src/utils/reservationRules';

describe('isWeeklyLimitExceeded', () => {
  it('retorna true si el cliente tiene 3 reservas', () => {
    expect(isWeeklyLimitExceeded(3)).toBe(true);
  });

  it('retorna true si el cliente tiene más de 3 reservas', () => {
    expect(isWeeklyLimitExceeded(5)).toBe(true);
  });

  it('retorna false si el cliente tiene menos de 3 reservas', () => {
    expect(isWeeklyLimitExceeded(2)).toBe(false);
  });
});
