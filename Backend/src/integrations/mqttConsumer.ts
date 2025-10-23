import mqtt from 'mqtt';
import { saveTelemetry } from '../services/telemetryService';

const brokerUrl = 'mqtt://localhost:1883'; // ajusta si usas otro host/puerto
const topic = 'SITE_AW/offices/OFFICE_1/telemetry'; // o usa wildcard si hay más oficinas

const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('✅ Connected to MQTT broker');
  client.subscribe(topic, err => {
    if (err) console.error('❌ Subscription error:', err.message);
  });
});

client.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    const [siteId, , officeId] = topic.split('/'); // SITE_AW / offices / OFFICE_1

    await saveTelemetry(siteId, officeId, payload);
    console.log('📥 Telemetry saved:', siteId, officeId, payload.ts);
  } catch (err) {
    console.error('❌ Error saving telemetry:', err.message);
  }
});
