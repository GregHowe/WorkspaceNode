// export const queryGroupByDay = `
//   SELECT 
//     siteId,
//     officeId,
//     DATE(ts) as timestamp,
//     AVG(temp_c) as temperature,
//     AVG(humidity_pct) as humidity,
//     AVG(power_w) as power,
//     COUNT(*) as count
//   FROM telemetry
//   WHERE siteId = ? AND officeId = ? AND ts BETWEEN ? AND ?
//   GROUP BY siteId, officeId, DATE(ts)
//   ORDER BY DATE(ts) DESC
//   LIMIT 50
// `;
