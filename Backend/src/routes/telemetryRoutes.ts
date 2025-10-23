import { Router } from 'express';
import {/* getTelemetryRawGrouped,*/ getTelemetryRaw } from '../services/telemetryService';

const router = Router();

router.get('/', async (req, res) => {
  // const { siteId, officeId, startDate, endDate, groupBy } = req.query;

  // if (!siteId || !officeId) {
  //   return res.status(400).json({ error: 'Missing siteId or officeId' });
  // }

  // const allowedGroupings = ['day', 'siteId', 'officeId'];
  // if (groupBy && !allowedGroupings.includes(groupBy)) {
  //   return res.status(400).json({ error: `Invalid groupBy value: ${groupBy}` });
  // }

  try {
    const rows =  await getTelemetryRaw();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;