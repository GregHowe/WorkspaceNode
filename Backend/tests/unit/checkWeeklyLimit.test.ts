import { checkWeeklyLimit, fetchReservationCount } from '../../src/services/reservationService';
import { MAX_RESERVATIONS_PER_WEEK } from '../../src/config/constants';
import { AppDataSource } from '../../src/config/data-source';

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

jest.mock('../../src/services/reservationService', () => ({
  ...jest.requireActual('../../src/services/reservationService'),
  fetchReservationCount: jest.fn()
}));

describe('checkWeeklyLimit', () => {
  it('should return true if emailClient has exceeded the weekly limit', async () => {
    const mockEmail = 'test@test.com';
    const mockDate = new Date();
    const mockReservationCount = MAX_RESERVATIONS_PER_WEEK + 1;
    
    // Mock fetchReservationCount to return more than the limit
    (fetchReservationCount as jest.Mock).mockResolvedValue(mockReservationCount);
    
    const result = await checkWeeklyLimit(mockEmail, mockDate);
    expect(result).toBe(true);
  });
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});
