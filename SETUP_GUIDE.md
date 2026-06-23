# Industrial Setup Guide — AXQUBIT BMS6000 Dashboard

This guide provides step-by-step instructions to configure and wire up your production dashboard to real-world commercial backends (PostgreSQL database, MQTT broker, and alert services).

---

## 1. Managed PostgreSQL Database (Neon.tech)

We recommend **Neon** because it provides a serverless PostgreSQL database with a free tier.

1. Navigate to [https://neon.tech](https://neon.tech) and register for an account.
2. Click **Create Project**, name it `axqubit-bms`, and select the region nearest your clients.
3. In the dashboard overview, look at **Connection Details**.
4. Change the dropdown option from **Node.js** to **Prisma**.
5. Copy the connection string (it automatically parses the environment variables structure).
   * It will look like: `postgresql://neondb_owner:xxxxx.aws.neon.tech/neondb?sslmode=require`
6. Paste this URL into your `.env.local` file under `DATABASE_URL`.
7. Once the connection string is set up, push your Prisma schemas to create the tables:
   ```bash
   npx prisma db push
   ```

---

## 2. Real-Time MQTT Broker (HiveMQ Cloud)

MQTT handles the instant 500ms telemetry updates. **HiveMQ Cloud** provides a free broker tier supporting up to 100 active connections.

1. Go to [https://www.hivemq.com/cloud/](https://www.hivemq.com/cloud/) and sign up.
2. Create a free **Serverless Cluster**.
3. Once the cluster is active, navigate to the **Credentials** tab:
   * Create a device login credential (e.g., Username: `axqubit_mcu`, Password: `secure_pass_123`).
   * Create a dashboard login credential (e.g., Username: `axqubit_web`, Password: `secure_pass_456`).
4. Note your **Cluster URL** (e.g., `7e3845a7a72d4a6ca70a48a9.s1.eu.hivemq.cloud`).
5. Populate your `.env.local` file:
   * **Client WebSocket (Browser)**:
     ```env
     NEXT_PUBLIC_MQTT_BROKER_URL="wss://7e3845a7a72d4a6ca70a48a9.s1.eu.hivemq.cloud:8884/mqtt"
     NEXT_PUBLIC_MQTT_USERNAME="axqubit_web"
     NEXT_PUBLIC_MQTT_PASSWORD="secure_pass_456"
     ```
   * **Server TCP (Next.js API for OTA commands)**:
     ```env
     MQTT_BROKER_URL="mqtts://7e3845a7a72d4a6ca70a48a9.s1.eu.hivemq.cloud:8883"
     MQTT_USERNAME="axqubit_web"
     MQTT_PASSWORD="secure_pass_456"
     ```

---

## 3. Email Gateway (Brevo SMTP)

For system alerts, we recommend **Brevo** (formerly Sendinblue) which offers 300 free emails per day.

1. Go to [https://www.brevo.com/](https://www.brevo.com/) and sign up.
2. Navigate to your **Account Profile → SMTP & API**.
3. Under the **SMTP** tab, copy the following parameters:
   * **SMTP Host**: `smtp-relay.brevo.com`
   * **SMTP Port**: `587`
   * **SMTP Login**: (your registered email)
   * **SMTP Password / Master Key**: (your generated API key)
4. Paste these values into `.env.local`:
   ```env
   SMTP_HOST="smtp-relay.brevo.com"
   SMTP_PORT="587"
   SMTP_USER="your-login-email"
   SMTP_PASS="your-smtp-master-key"
   SMTP_FROM="bms-alerts@yourcompany.com"
   ```

---

## 4. Telegram Notification Channel (100% Free & Fast)

1. Open Telegram and search for `@BotFather`.
2. Send `/newbot` and follow the instructions (name the bot, e.g., `AxqubitBmsBot`, and username, e.g., `axqubit_bms_bot`).
3. Copy the **HTTP API Token** provided (looks like `123456789:ABCdefGh...`).
4. Create a group chat or channel in Telegram, add your bot as an Admin.
5. Send a test message in the channel.
6. Open your web browser and load:
   `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
7. Find the chat details in the JSON response:
   * `"chat":{"id":-100293847291,"title":"BMS Alerts",...}`
   * The Chat ID will be a negative number starting with `-100`.
8. Save this in your `.env.local`:
   ```env
   TELEGRAM_BOT_TOKEN="123456789:ABCdefGh..."
   TELEGRAM_CHAT_ID="-100293847291"
   ```

---

## 5. WhatsApp Business Gateway (WATI API)

1. Sign up on [https://www.wati.io/](https://www.wati.io/) for a business API account.
2. Link your Facebook Business Manager and WhatsApp phone number.
3. Once approved, go to **API Integration** in the WATI dashboard.
4. Copy the **API Endpoint** and the **Access Token**.
5. Save in `.env.local`:
   ```env
   WATI_API_ENDPOINT="https://live-server-xxx.wati.io"
   WATI_API_TOKEN="eyJhbGciOi..."
   ```
