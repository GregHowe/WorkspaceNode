import { broadcastTelemetry } from '../websocketServer';
import mqtt from 'mqtt';
import { DEFAULT_MQTT_BROKER, DEFAULT_MQTT_TOPIC } from '../config/constants';
import { saveTelemetry } from '../services/telemetryService';
import dotenv from 'dotenv';
dotenv.config();

const brokerUrl = process.env.MQTT_BROKER_URL || DEFAULT_MQTT_BROKER;
const topic = process.env.MQTT_TOPIC || DEFAULT_MQTT_TOPIC;

const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('📡 Connected to MQTT broker');
  client.subscribe(topic, (err) => {
        if (err) console.error('❌ Error subscribing to topic:', err);
        else console.log(`✅ Subscribed to topic: ${topic}`);
  });
});

client.on('message', async (topic, payload) => {
  const data = JSON.parse(payload.toString());
  const [_, siteId, __, officeId] = topic.split('/');

  try {
    await saveTelemetry(siteId, officeId, data);

    broadcastTelemetry({
      siteId,
      officeId,
      timestamp: new Date(data.ts).toISOString(),
      temperature: data.temp_c,
      humidity: data.humidity_pct,
      power: data.power_w,
      co2: data.co2_ppm,
      occupancy: data.occupancy,
    });

    // console.log('💾 Telemetry saved');
  } catch (err) {
    console.error('❌ Error saving telemetry:', err.message);
  }
});


