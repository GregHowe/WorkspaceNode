import { Router } from 'express';
import { getTelemetryRaw } from '../services/telemetryService';

const router = Router();

router.get('/', async (req, res) => {

  try {
    const rows =  await getTelemetryRaw();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;