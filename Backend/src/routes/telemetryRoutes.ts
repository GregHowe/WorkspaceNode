import { Router } from 'express';
import { getTelemetryRawGrouped, getTelemetryRaw } from '../services/telemetryService';

const router = Router();

router.get('/', async (req, res) => {
  const { siteId, officeId, startDate, endDate, groupBy } = req.query;

  if (!siteId || !officeId) {
    return res.status(400).json({ error: 'Missing siteId or officeId' });
  }

  const allowedGroupings = ['day', 'siteId', 'officeId'];
  if (groupBy && !allowedGroupings.includes(groupBy)) {
    return res.status(400).json({ error: `Invalid groupBy value: ${groupBy}` });
  }

  try {
    const rows = groupBy
      ? await getTelemetryRawGrouped(groupBy as string, siteId as string, officeId as string, startDate as string, endDate as string)
      : await getTelemetryRaw(siteId as string, officeId as string, startDate as string, endDate as string);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;