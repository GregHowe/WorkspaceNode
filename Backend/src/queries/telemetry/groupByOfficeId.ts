export const queryGroupByOfficeId = `
  SELECT 
    officeId,
    MIN(ts) as startDate,
    MAX(ts) as endDate,
    AVG(power_w) as power,
    COUNT(*) as count
  FROM telemetry
  WHERE siteId = ? AND officeId = ? AND ts BETWEEN ? AND ?
  GROUP BY officeId
  ORDER BY officeId
  LIMIT 50
`;
