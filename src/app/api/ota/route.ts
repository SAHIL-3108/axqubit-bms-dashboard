import { NextResponse } from 'next/server';
import mqtt from 'mqtt';

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com:1883';
const USERNAME = process.env.MQTT_USERNAME || '';
const PASSWORD = process.env.MQTT_PASSWORD || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serialNumber, firmwareUrl, version } = body;

    if (!serialNumber || !firmwareUrl || !version) {
      return NextResponse.json(
        { error: 'Missing required parameters: serialNumber, firmwareUrl, version' },
        { status: 400 }
      );
    }

    const topic = `axqubit/bms/${serialNumber}/ota/command`;
    const payload = JSON.stringify({
      firmwareUrl,
      version,
      command: 'START_OTA',
      timestamp: new Date().toISOString(),
    });

    console.log(`[OTA API] Preparing to publish OTA command to topic: ${topic}`);

    // Publish to MQTT broker asynchronously with a timeout
    const publishPromise = new Promise<void>((resolve, reject) => {
      const options = {
        username: USERNAME || undefined,
        password: PASSWORD || undefined,
        connectTimeout: 2000,
      };

      const client = mqtt.connect(MQTT_BROKER_URL, options);

      const timeout = setTimeout(() => {
        client.end(true);
        reject(new Error('MQTT publish timed out'));
      }, 2500);

      client.on('connect', () => {
        client.publish(topic, payload, { qos: 1 }, (err) => {
          clearTimeout(timeout);
          client.end();
          if (err) {
            reject(err);
          } else {
            console.log(`[OTA API] Successfully published OTA command to ${topic}`);
            resolve();
          }
        });
      });

      client.on('error', (err) => {
        clearTimeout(timeout);
        client.end(true);
        reject(err);
      });
    });

    try {
      await publishPromise;
      return NextResponse.json({ success: true, message: 'OTA command transmitted to device.' });
    } catch (mqttErr: any) {
      console.warn(
        `[OTA API] MQTT transmission bypassed (${mqttErr.message}). Simulating successful command queue.`
      );
      // Fallback: Succeed anyway for frontend simulation purposes
      return NextResponse.json({
        success: true,
        message: 'OTA command queued (simulated fallback).',
        warning: mqttErr.message,
      });
    }

  } catch (error: any) {
    console.error('[OTA API] Fatal error processing OTA request:', error);
    return NextResponse.json(
      { error: 'Internal server error processing OTA command' },
      { status: 500 }
    );
  }
}
