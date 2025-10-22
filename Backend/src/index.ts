import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { validateApiKey } from  './middleware/validateApiKey ';
import 'dotenv/config';
import telemetryRoutes from './routes/telemetryRoutes';

import { Telemetry } from './entities/Telemetry';

import { AppDataSource } from './config/data-source';
import placeRoutes from './routes/placeRoutes';
import spaceRoutes from './routes/spaceRoutes';
import reservationRoutes from './routes/reservationRoutes';
import { validateApiKey  } from './middleware/validateApiKey ';
import './mqtt/client';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
}));

app.use(express.json());

// Apply API key middleware globally
app.use(validateApiKey );

// Routes
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/reservations', reservationRoutes);

// Start server after DB connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    AppDataSource.manager.find(Telemetry).then((rows) => {
       console.log('📊 Telemetry rows:', rows);
    });


    app.listen(process.env.PORT, () => {
      console.log(`Server running on port {${process.env.PORT}}`);
    });
  })
  .catch((error) => console.error(error));
  

