<div align="center">

# ⚡ AXQUBIT BMS6000 Smart Battery Management System Dashboard

**Industrial-Grade IoT SaaS Platform for Real-Time Battery Intelligence**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://typescriptlang.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql)](https://postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Built by AXQUBIT Technologies — Vadodara, Gujarat, India 🇮🇳**

</div>

---

## 📌 Overview

The **AXQUBIT BMS6000 Dashboard** is a production-ready, industrial-grade SaaS platform for monitoring, diagnosing, and managing the BMS6000 Series 6S LiFePO₄ Smart Battery Management System. Designed for demanding environments across:

| Industry | Application |
|---|---|
| 🚗 Electric Vehicles (EV) | Battery pack health & range analytics |
| 🤖 Robotics & Automation | Continuous power supply monitoring |
| 🚁 Drones & UAVs | Flight-critical discharge tracking |
| ☀️ Solar Energy Storage | ESS SOC / SOH logging |
| 🏭 OEM Battery Manufacturers | Multi-pack fleet management & QA |

**Key Capabilities at a Glance:**
- ⚡ Real-time telemetry via MQTT WebSockets (< 500 ms latency)
- 🔋 Cell-level diagnostics for all 6 cells in series
- 🧠 AI-driven SOH prediction & Remaining Useful Life (RUL) estimation
- 🚨 Protection event logging with 8-fault register coverage
- 🌐 Multi-pack Fleet Overview — monitor up to **32 battery packs** simultaneously
- 📤 CSV / PDF data export
- 🔐 Role-based access control (Admin / Engineer / Customer)
- 🛰️ OTA firmware update triggering
- 📡 Multi-protocol support: UART, CAN Bus, RS485, Bluetooth, MQTT

---

## 🏗️ System Architecture

The BMS6000 Dashboard follows a secure, low-latency end-to-end topology.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BATTERY PACK (Hardware)                      │
│                                                                     │
│  [Cell 1] [Cell 2] [Cell 3] [Cell 4] [Cell 5] [Cell 6]            │
│      └───────────────┬──────────────────────────┘                  │
│              7-Pin Balance Connector                                │
│                      │                                             │
│             [BMS6000 MCU — ESP32-S3]                               │
│          ┌────────────┴────────────────┐                           │
│     [Current Shunt 100A]    [NTC Thermistors]                      │
└─────────────────────────────────────────────────────────────────────┘
                        │ Wi-Fi / TLS
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CONNECTIVITY LAYER                               │
│                                                                     │
│         [Secure MQTT Broker — HiveMQ / Mosquitto / EMQX]           │
│                        │                                           │
│              WebSockets (wss://)                                   │
└─────────────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   CLOUD BACKEND & DASHBOARD                         │
│                                                                     │
│   [Next.js 16 SaaS Dashboard] ──── REST Fallback ─── [FastAPI]     │
│          │                                              │           │
│   [Prisma ORM] ──────────────────── [PostgreSQL DB]    │           │
│          │                                              │           │
│   [Alert Dispatcher]                         [AI Engine]           │
│   ├── SMTP Email                             ├── SOH Regression    │
│   ├── WhatsApp (WATI)                        ├── Cell Deviation     │
│   └── Telegram Bot                          └── C-Rate Advisor     │
└─────────────────────────────────────────────────────────────────────┘
                        │
                        ▼
              OTA Firmware Trigger ──▶ MQTT Broker ──▶ ESP32-S3
```

---

## 🔌 Hardware Wiring & End-to-End Connection Guide

### Step 1 — Cell Balancing Harness (7-Pin Connector)

Connect the 7-pin balance harness to the LiFePO₄ battery terminals in this order:

| Pin | Label | Connect To |
|-----|-------|------------|
| 1 | B− | Cell 1 Negative (Pack Negative) |
| 2 | B1 | Junction: Cell 1 (+) & Cell 2 (−) |
| 3 | B2 | Junction: Cell 2 (+) & Cell 3 (−) |
| 4 | B3 | Junction: Cell 3 (+) & Cell 4 (−) |
| 5 | B4 | Junction: Cell 4 (+) & Cell 5 (−) |
| 6 | B5 | Junction: Cell 5 (+) & Cell 6 (−) |
| 7 | B+ | Cell 6 Positive (Pack Positive) |

### Step 2 — Current Shunt

Wire a **high-precision low-side 100A current shunt** (e.g., 75mV/100A rated) in series with the main pack negative wire (`B−` → `P−` load terminal). Connect the shunt sense leads to the BMS ADC inputs.

### Step 3 — Temperature Sensors

Affix the **NTC 10kΩ thermistor** probe physically to the centre cells (Cell 3 or Cell 4) to monitor peak internal pack temperature.

### Step 4 — ESP32-S3 Firmware Configuration

The BMS6000 onboard **ESP32-S3** runs a FreeRTOS firmware package, polling ADC registers every **500 ms** and publishing telemetry JSON payloads over secure MQTT.

```cpp
// Firmware configuration constants (config.h)
#define DEVICE_SERIAL       "AXQ-BMS6000-LFP-082301"
#define WIFI_SSID           "Your_WiFi_SSID"
#define WIFI_PASSWORD       "Your_WiFi_Password"
#define MQTT_BROKER_URL     "mqtts://your-broker.hivemq.cloud:8883"
#define MQTT_USERNAME       "your_mqtt_username"
#define MQTT_PASSWORD       "your_mqtt_password"
#define TELEMETRY_INTERVAL  500  // ms
```

Flash these settings, power on the BMS board, and confirm it appears in the dashboard's Fleet Overview.

---

## 📡 MQTT Topic Registry & Payload Schemas

The BMS firmware communicates with the dashboard over the following MQTT topics. Replace `{serialNumber}` with the device ID (e.g., `AXQ-BMS6000-LFP-082301`).

### 1. Telemetry Topic — `axqubit/bms/{serialNumber}/telemetry`

**Published by BMS every 500 ms.**

```json
{
  "serialNumber": "AXQ-BMS6000-LFP-082301",
  "timestamp": "2026-06-23T11:20:00.000Z",
  "soc": 78.4,
  "soh": 99.2,
  "voltage": 19.92,
  "current": -2.5,
  "power": -49.8,
  "packTemp": 29.5,
  "cycleCount": 124,
  "isCharging": false,
  "isDischarging": true,
  "isBalancing": false,
  "status": "normal",
  "chargingMode": "idle",
  "remainingCapacity": 78.4,
  "nominalCapacity": 100.0,
  "energyThroughput": 248.5,
  "protectionFlags": {
    "ovp": false,
    "uvp": false,
    "ocp": false,
    "scp": false,
    "otp": false,
    "utp": false,
    "covp": false,
    "cuvp": false
  }
}
```

### 2. Cell Data Topic — `axqubit/bms/{serialNumber}/cells`

**Published by BMS every 500 ms.**

```json
[
  { "cellNumber": 1, "voltage": 3.325, "temp": 29.2, "isBalancing": false, "deltaV": 0 },
  { "cellNumber": 2, "voltage": 3.321, "temp": 29.1, "isBalancing": false, "deltaV": 0 },
  { "cellNumber": 3, "voltage": 3.328, "temp": 29.5, "isBalancing": false, "deltaV": 0 },
  { "cellNumber": 4, "voltage": 3.319, "temp": 29.4, "isBalancing": false, "deltaV": 0 },
  { "cellNumber": 5, "voltage": 3.324, "temp": 29.2, "isBalancing": false, "deltaV": 0 },
  { "cellNumber": 6, "voltage": 3.327, "temp": 29.3, "isBalancing": false, "deltaV": 0 }
]
```

### 3. OTA Command Topic — `axqubit/bms/{serialNumber}/ota/command`

**Subscribed to by BMS. Published by dashboard when user triggers an OTA update.**

```json
{
  "command": "START_OTA",
  "firmwareUrl": "https://firmware.axqubit.com/bms6000/v1.1.0-release.bin",
  "version": "v1.1.0",
  "timestamp": "2026-06-23T11:20:00.000Z"
}
```

---

## 🚀 Quick Start — Local Development

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18.x LTS |
| npm | ≥ 9.x |
| PostgreSQL | ≥ 14 (optional — falls back to mock data) |
| Python | ≥ 3.11 (for FastAPI backend) |

### 1. Clone the Repository

```bash
git clone https://github.com/SAHIL-3108/axqubit-bms-dashboard.git
cd axqubit-bms-dashboard
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your values:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/axqubit_bms?schema=public"

# MQTT Broker (WebSocket for browser, TCP for server)
NEXT_PUBLIC_MQTT_BROKER_URL="wss://your-broker.hivemq.cloud:8884/mqtt"
NEXT_PUBLIC_MQTT_USERNAME="your_username"
NEXT_PUBLIC_MQTT_PASSWORD="your_password"
MQTT_BROKER_URL="mqtts://your-broker.hivemq.cloud:8883"

# Email alerts (SMTP / Mailtrap for testing)
SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_USER="your_mailtrap_user"
SMTP_PASS="your_mailtrap_pass"
SMTP_FROM="bms-alerts@axqubit.com"

# WhatsApp alerts (WATI)
WATI_API_ENDPOINT="https://live-server.wati.io"
WATI_API_TOKEN="your_wati_token"

# Telegram Bot
TELEGRAM_BOT_TOKEN="your_bot_token"
TELEGRAM_CHAT_ID="@your_channel"
```

> **No database yet?** The dashboard works fully offline with realistic simulated mock data. Skip the database steps and go straight to `npm run dev`.

### 4. Initialize the Database (Optional)

```bash
# Generate Prisma client
npx prisma generate

# Push schema to your PostgreSQL database
npx prisma db push
```

### 5. Start the FastAPI Backend (Optional)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 6. Run the Dashboard

```bash
npm run dev
```

Open **http://localhost:3000/dashboard** in your browser.

---

## 📊 Dashboard Features

### Real-Time Monitoring Panel
Live streaming charts for pack voltage, current, power, and temperature refreshed every **1 second** via MQTT or HTTP fallback polling.

### Cell Diagnostics
Individual cell voltage bars with **delta-V deviation highlighting** — any cell deviating > 25 mV from the pack average is flagged automatically.

### SOC & SOH Gauges
- **State of Charge (SOC)**: Animated semicircle gauge with gradient color coding (green → amber → red)
- **State of Health (SOH)**: Trend indicator with Remaining Useful Life (RUL) estimate in days

### Protection Events & Fault Log
8-register fault monitoring with severity classification:

| Register | Trigger Condition |
|----------|-------------------|
| OVP — Over-Voltage Protection | Cell voltage > 3.65 V |
| UVP — Under-Voltage Protection | Cell voltage < 2.50 V |
| OCP — Over-Current Protection | Discharge current > 100 A |
| SCP — Short-Circuit Protection | Instantaneous current spike |
| OTP — Over-Temperature Protection | Pack temperature > 55 °C |
| UTP — Under-Temperature Protection | Pack temperature < -10 °C |
| COVP — Cell Over-Voltage | Individual cell deviation |
| CUVP — Cell Under-Voltage | Individual cell deviation |

### Fleet Overview (32 Packs)
Multi-pack monitoring grid with live SOC %, temperature, status indicators, and one-click pack selection for deep-dive diagnostics.

### Communication Interfaces Panel
Configure and view protocol settings for:
- **UART** — Serial baud rate & parity
- **CAN Bus** — Bitrate & node ID
- **RS485** — Slave address & termination
- **Bluetooth** — Pairing PIN & BLE mode
- **MQTT** — Broker URL, TLS toggle, topic prefix

### OTA Firmware Updates
- Upload firmware binary URL
- Trigger OTA flash over MQTT to any registered BMS device
- Real-time flash progress streaming with success/failure confirmation

### Alert Configuration
Configure notification thresholds and delivery channels:
- SOC low-battery alert threshold
- Temperature over-limit threshold
- Cell delta-V imbalance threshold
- Notification delivery: Email (SMTP), WhatsApp (WATI), Telegram Bot

### Data Export
- **CSV Export**: Full 24-hour telemetry history
- **PDF Report**: Formatted diagnostic summary

---

## 🔐 Role-Based Access Control

| Feature | Admin | Engineer | Customer |
|---------|:-----:|:--------:|:--------:|
| Live Telemetry | ✅ | ✅ | ✅ |
| Cell Diagnostics | ✅ | ✅ | ✅ |
| Fleet Overview | ✅ | ✅ | ✅ |
| Fault History | ✅ | ✅ | ✅ |
| Data Export (CSV/PDF) | ✅ | ✅ | ✅ |
| Alert Configuration | ✅ | ✅ | 🔒 View Only |
| Communication Config | ✅ | ✅ | 🔒 View Only |
| OTA Firmware Update | ✅ | 🔒 View Only | 🔒 Locked |
| REST API Docs | ✅ | ✅ | ❌ Hidden |

---

## 🧠 AI Diagnostic Engine

The dashboard includes a lightweight on-device AI engine for predictive analytics:

| Feature | Method | Description |
|---------|--------|-------------|
| **SOH Prediction** | Linear Regression (y = mx + c) | Projects capacity fade curve on cycle-count logs to estimate End-of-Life (EOL) at 80% SoH |
| **Remaining Useful Life** | RUL = (SoH − 80) / fade rate | Calculates days to EOL based on current degradation slope |
| **Cell Deviation Detection** | Mean ± σ threshold | Flags any cell deviating > 25 mV from pack average as unbalanced |
| **C-Rate Advisor** | C-rate = I / Capacity | Warns if charge/discharge current exceeds 0.3C (stress threshold) |
| **Maintenance Predictor** | Rule-based triggers | Suggests service check when cycle count crosses 500 / 1000 / 1500 |

---

## 🌐 REST API Reference

The dashboard exposes REST API endpoints for integration with external systems. Refer to the in-app **API Docs** tab (Admin/Engineer roles) for the full interactive Swagger-style reference.

### Base URL
```
http://localhost:3000/api
```

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/bms/live?serialNumber={id}` | Fetch latest live telemetry snapshot |
| `GET` | `/api/bms/cells?serialNumber={id}` | Fetch current 6-cell voltage & temperature data |
| `GET` | `/api/bms/fleet` | Fetch status summary of all 32 registered packs |
| `GET` | `/api/bms/history?serialNumber={id}&range=24h` | Fetch historical telemetry (1h / 24h / 7d / 30d) |
| `GET` | `/api/alerts` | Get active alert configuration |
| `POST` | `/api/alerts` | Update alert thresholds & notification channels |
| `GET` | `/api/export?serialNumber={id}&format=csv` | Download CSV telemetry export |
| `POST` | `/api/ota` | Trigger OTA firmware flash for a device |

---

## 🗄️ Database Schema

```
TelemetryRecord
├── id           String (UUID, PK)
├── serialNumber String
├── timestamp    DateTime
├── soc          Float
├── soh          Float
├── voltage      Float
├── current      Float
├── power        Float
├── packTemp     Float
└── cycleCount   Int

FaultEvent
├── id           String (UUID, PK)
├── serialNumber String
├── timestamp    DateTime
├── code         String
├── message      String
├── severity     String  (info | warning | critical)
├── resolved     Boolean
└── resolvedAt   DateTime?

AlertConfig
├── id                 String (PK = "global-config")
├── emailEnabled       Boolean
├── emailRecipient     String
├── whatsappEnabled    Boolean
├── whatsappRecipient  String
├── telegramEnabled    Boolean
├── telegramRecipient  String
├── socThreshold       Float  (default: 20%)
├── tempThreshold      Float  (default: 55°C)
└── cellDeltaThreshold Float  (default: 50mV)
```

---

## 🚀 Production Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to your Vercel account
vercel login

# Deploy to production
vercel --prod --yes
```

In your **Vercel Project → Settings → Environment Variables**, add all keys from `.env.local`.

> **Recommended**: Use [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com) for serverless PostgreSQL on Vercel.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | Next.js 16 (App Router, Turbopack) |
| **UI Library** | React 19, TailwindCSS 4, Lucide Icons |
| **State Management** | Zustand |
| **Data Visualization** | Recharts (AreaChart, real-time streaming) |
| **ORM** | Prisma 6 + PostgreSQL |
| **Real-Time Protocol** | MQTT.js (WebSockets / TLS) |
| **Backend (optional)** | FastAPI + SQLAlchemy (Python 3.11) |
| **Notifications** | Nodemailer SMTP, WATI WhatsApp, Telegram Bot |
| **Deployment** | Vercel (frontend) + any Python host (backend) |

---

## 📁 Project Structure

```
axqubit-bms-dashboard/
├── backend/                  # Python FastAPI backend (optional)
│   ├── main.py               # API router + 32-pack fleet generator
│   ├── models.py             # SQLAlchemy ORM models
│   ├── schemas.py            # Pydantic request/response schemas
│   ├── ai.py                 # SOH regression & diagnostic engines
│   ├── database.py           # DB connection (PostgreSQL / SQLite fallback)
│   └── requirements.txt      # Python dependencies
├── prisma/
│   └── schema.prisma         # Database schema
├── src/
│   ├── app/
│   │   ├── api/              # Next.js API route handlers
│   │   │   ├── bms/live/     # Live telemetry endpoint
│   │   │   ├── bms/cells/    # Cell data endpoint
│   │   │   ├── bms/fleet/    # Fleet status endpoint
│   │   │   ├── bms/history/  # Historical data endpoint
│   │   │   ├── alerts/       # Alert config endpoint
│   │   │   ├── export/       # CSV/PDF export endpoint
│   │   │   └── ota/          # OTA trigger endpoint
│   │   ├── dashboard/        # Main dashboard page
│   │   └── layout.tsx        # Root layout with Sidebar & Topbar
│   ├── components/
│   │   ├── charts/           # LiveRechart (Recharts area streaming)
│   │   ├── dashboard/        # SOC gauge, cell cards, AI panel
│   │   ├── fleet/            # FleetOverview 32-pack grid
│   │   ├── layout/           # Sidebar, Topbar
│   │   ├── monitoring/       # Voltage, current, temp, power charts
│   │   ├── protection/       # FaultHistory, AlertConfig
│   │   ├── settings/         # CommInterfaces, OtaUpdate, ApiDocs
│   │   └── ui/               # Shared UI primitives
│   ├── hooks/
│   │   └── useBmsLive.ts     # MQTT + HTTP fallback polling hook
│   ├── lib/
│   │   ├── mqtt.ts           # MQTT client singleton
│   │   └── prisma.ts         # Prisma client singleton
│   ├── store/
│   │   └── bmsStore.ts       # Zustand global state store
│   └── types/
│       └── bms.ts            # TypeScript type definitions
├── .env.local.example        # Environment variable template
├── SETUP_GUIDE.md            # Detailed third-party service setup guide
└── README.md                 # This file
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| `DATABASE_URL not found` | Copy `.env.local.example` → `.env.local` and fill in your PostgreSQL URI. Dashboard works with mock data without it. |
| No live data showing | Verify your MQTT broker credentials in `.env.local`. The dashboard auto-falls back to HTTP polling every 1s. |
| Hydration warning in console | Caused by browser extensions (Grammarly etc.) — already suppressed via `suppressHydrationWarning` on `<body>`. |
| OTA flash not triggering | Confirm the BMS device `serialNumber` in the UI matches the ESP32 client ID exactly. |
| Port 3000 already in use | Run `npm run dev -- -p 3001` to use a different port. |

---

## 📄 License

MIT License — Free to use for commercial and private projects.

---

<div align="center">

**AXQUBIT BMS6000 Dashboard v2.0**

*Designed and engineered by AXQUBIT Technologies — Vadodara, Gujarat, India*

[⭐ Star this repo](https://github.com/SAHIL-3108/axqubit-bms-dashboard) • [🐛 Report an Issue](https://github.com/SAHIL-3108/axqubit-bms-dashboard/issues) • [📧 Contact](mailto:support@axqubit.com)

</div>
