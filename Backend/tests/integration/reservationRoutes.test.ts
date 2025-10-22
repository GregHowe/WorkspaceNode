import request from 'supertest';
import app from '../../src/index'; 
import { AppDataSource } from '../../src/config/data-source';

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

describe('GET /reservas', () => {
  it('should return paginated reservations', async () => {
    const response = await request(app)
      .get('/reservas?page=1&limit=5')
      .set('x-api-key', 'darien123');

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.pagination).toHaveProperty('page');
    expect(response.body.pagination).toHaveProperty('limit');
  });
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});
