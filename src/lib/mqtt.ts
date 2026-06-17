import mqtt, { MqttClient } from 'mqtt';

const BROKER_URL = process.env.NEXT_PUBLIC_MQTT_BROKER_URL || 'wss://broker.hivemq.com:8884/mqtt';
const USERNAME = process.env.NEXT_PUBLIC_MQTT_USERNAME || '';
const PASSWORD = process.env.NEXT_PUBLIC_MQTT_PASSWORD || '';

class BmsMqttService {
  private client: MqttClient | null = null;
  private subscriptions: Map<string, Set<(payload: any) => void>> = new Map();

  constructor() {
    // Only connect on the client-side
    if (typeof window !== 'undefined') {
      this.connect();
    }
  }

  private connect() {
    if (this.client) return;

    const options = {
      username: USERNAME || undefined,
      password: PASSWORD || undefined,
      clean: true,
      connectTimeout: 5000,
      reconnectPeriod: 2000,
    };

    try {
      this.client = mqtt.connect(BROKER_URL, options);

      this.client.on('connect', () => {
        console.log('MQTT client connected to:', BROKER_URL);
        // Resubscribe to all active topics on reconnect
        for (const topic of this.subscriptions.keys()) {
          this.client?.subscribe(topic);
        }
      });

      this.client.on('message', (topic, message) => {
        try {
          const payload = JSON.parse(message.toString());
          const callbacks = this.subscriptions.get(topic);
          if (callbacks) {
            callbacks.forEach((callback) => callback(payload));
          }
        } catch (err) {
          console.error(`Error parsing message on topic ${topic}:`, err);
        }
      });

      this.client.on('error', (err) => {
        console.error('MQTT connection error:', err);
      });

      this.client.on('close', () => {
        console.log('MQTT connection closed');
      });
    } catch (e) {
      console.error('Failed to initialize MQTT client:', e);
    }
  }

  public subscribe(topic: string, callback: (payload: any) => void) {
    if (typeof window === 'undefined') return () => {};

    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set());
      if (this.client && this.client.connected) {
        this.client.subscribe(topic);
      }
    }

    this.subscriptions.get(topic)!.add(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscriptions.get(topic);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.subscriptions.delete(topic);
          if (this.client && this.client.connected) {
            this.client.unsubscribe(topic);
          }
        }
      }
    };
  }

  public publish(topic: string, message: any) {
    if (typeof window === 'undefined') return;

    if (this.client && this.client.connected) {
      const payload = typeof message === 'string' ? message : JSON.stringify(message);
      this.client.publish(topic, payload, { qos: 1 }, (err) => {
        if (err) {
          console.error(`Failed to publish to topic ${topic}:`, err);
        }
      });
    } else {
      console.warn('MQTT Client not connected. Cannot publish message.');
    }
  }

  public getConnectionStatus(): boolean {
    return this.client ? this.client.connected : false;
  }

  public disconnect() {
    if (this.client) {
      this.client.end();
      this.client = null;
      this.subscriptions.clear();
    }
  }
}

// Singleton pattern export
export const mqttService = new BmsMqttService();
