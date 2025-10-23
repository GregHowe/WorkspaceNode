import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Place } from '../entities/Place';
import { Space } from '../entities/Space'; 
import { SpaceParameters } from '../entities/SpaceParameters';
import { Reservation } from '../entities/Reservation';
import { Telemetry } from '../entities/Telemetry';

export const AppDataSource = new DataSource({
  type: 'mysql',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'Jumpstart0.*',
  // database: 'workspace_db',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'workspace_db',
  synchronize: true,
  logging: false,
  entities: [Place, Space,SpaceParameters, Reservation, Telemetry],
});
