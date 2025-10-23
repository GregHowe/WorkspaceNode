import { AppDataSource } from '../../src/config/data-source';
import { Reservation } from '../../src/entities/Reservation';
import { Space } from '../../src/entities/Space';
import { checkWeeklyLimit } from '../../src/services/reservationService';

beforeAll(async () => {
  await AppDataSource.initialize();

  // Insertar 3 espacios distintos
  const spaceRepo = AppDataSource.getRepository(Space);
  await spaceRepo.save([
    spaceRepo.create({ id: 1, name: 'Sala A', capacity: 5 }),
    spaceRepo.create({ id: 2, name: 'Sala B', capacity: 5 }),
    spaceRepo.create({ id: 3, name: 'Sala C', capacity: 5 })
  ]);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('checkWeeklyLimit (integración)', () => {
  const emailClient = 'test@example.com';
  const reservationDate = new Date('2025-10-20'); // lunes

  beforeEach(async () => {
    const repo = AppDataSource.getRepository(Reservation);
    await repo.clear();

    // Insertar 3 reservas en espacios distintos y horarios no solapados
    await repo.save([
      repo.create({
        emailClient,
        reservationDate: reservationDate.toISOString(),
        startTime: '09:00',
        endTime: '10:00',
        space: { id: 1 }
      }),
      repo.create({
        emailClient,
        reservationDate: reservationDate.toISOString(),
        startTime: '10:30',
        endTime: '11:30',
        space: { id: 2 }
      }),
      repo.create({
        emailClient,
        reservationDate: reservationDate.toISOString(),
        startTime: '12:00',
        endTime: '13:00',
        space: { id: 3 }
      })
    ]);
  });

  it('retorna true si el cliente ya tiene 3 reservas en la semana', async () => {
    const result = await checkWeeklyLimit(emailClient, reservationDate);
    expect(result).toBe(true);
  });
});
