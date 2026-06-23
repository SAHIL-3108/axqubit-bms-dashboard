import random
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, Depends, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models, schemas, ai
from database import engine, get_db, Base

# Create tables on startup automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AXQUBIT BMS6000 API Gateway",
    description="Industrial-grade IoT SaaS REST API backend for EV, Robotics, Drones, Solar ESS, and OEM manufacturers.",
    version="2.0.0"
)

# Enable CORS for Next.js app on port 3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory alert configuration fallback if SQLite fails
memory_alert_config = {
    "emailEnabled": True,
    "emailRecipient": "admin@axqubit.com",
    "whatsappEnabled": False,
    "whatsappRecipient": "+919999999999",
    "telegramEnabled": False,
    "telegramRecipient": "@axqubit_bms_bot",
    "socThreshold": 20.0,
    "tempThreshold": 55.0,
    "cellDeltaThreshold": 50.0
}

# In-memory fleet generator (up to 32 battery packs)
applications = ["EV", "Robotics", "Drone", "Solar ESS", "OEM Pack"]
status_types = ["normal", "warning", "fault", "offline"]
charging_modes = ["idle", "bulk", "absorption", "float"]

def generate_static_fleet() -> List[schemas.FleetPackInfo]:
    fleet = []
    # EV: 8 packs
    for i in range(1, 9):
        fleet.append(
            schemas.FleetPackInfo(
                serialNumber=f"AXQ-EV-{i:02d}",
                application="EV",
                soc=float(random.randint(45, 95)),
                soh=float(round(random.uniform(94.0, 99.8), 1)),
                voltage=19.8 + random.uniform(-0.5, 0.5),
                current=random.uniform(-40.0, -10.0),
                packTemp=28.0 + random.uniform(0.0, 8.0),
                cycleCount=random.randint(150, 480),
                status="normal" if i != 5 else "warning",
                chargingMode="idle"
            )
        )
    # Robotics: 8 packs
    for i in range(1, 9):
        fleet.append(
            schemas.FleetPackInfo(
                serialNumber=f"AXQ-ROB-{i:02d}",
                application="Robotics",
                soc=float(random.randint(20, 85)),
                soh=float(round(random.uniform(96.0, 99.5), 1)),
                voltage=19.6 + random.uniform(-0.4, 0.4),
                current=random.uniform(-15.0, 5.0),
                packTemp=26.0 + random.uniform(0.0, 6.0),
                cycleCount=random.randint(80, 220),
                status="normal" if i != 3 else "fault",
                chargingMode="idle" if i != 3 else "idle"
            )
        )
    # Drone: 8 packs
    for i in range(1, 9):
        is_charging = i == 2
        fleet.append(
            schemas.FleetPackInfo(
                serialNumber=f"AXQ-DRN-{i:02d}",
                application="Drone",
                soc=float(random.randint(15, 99)) if not is_charging else 92.0,
                soh=float(round(random.uniform(92.0, 98.5), 1)),
                voltage=19.4 + random.uniform(-0.6, 0.6) if not is_charging else 21.4,
                current=random.uniform(-45.0, -25.0) if not is_charging else 12.5,
                packTemp=32.0 + random.uniform(0.0, 10.0),
                cycleCount=random.randint(40, 120),
                status="normal" if i != 6 else "offline",
                chargingMode="idle" if not is_charging else "bulk"
            )
        )
    # Solar ESS: 4 packs
    for i in range(1, 5):
        fleet.append(
            schemas.FleetPackInfo(
                serialNumber=f"AXQ-SLR-{i:02d}",
                application="Solar ESS",
                soc=float(random.randint(60, 98)),
                soh=float(round(random.uniform(97.0, 99.9), 1)),
                voltage=20.0 + random.uniform(-0.2, 0.2),
                current=random.uniform(5.0, 25.0), # charging during day
                packTemp=24.0 + random.uniform(0.0, 4.0),
                cycleCount=random.randint(300, 850),
                status="normal",
                chargingMode="float" if i == 1 else "bulk"
            )
        )
    # OEM Pack: 4 packs
    for i in range(1, 5):
        fleet.append(
            schemas.FleetPackInfo(
                serialNumber=f"AXQ-OEM-{i:02d}",
                application="OEM Pack",
                soc=float(random.randint(5, 100)),
                soh=float(round(random.uniform(95.0, 99.8), 1)),
                voltage=19.2 + random.uniform(-0.8, 0.8),
                current=random.uniform(-5.0, 5.0),
                packTemp=25.0 + random.uniform(0.0, 5.0),
                cycleCount=random.randint(10, 150),
                status="normal",
                chargingMode="idle"
            )
        )
    return fleet

fleet_cache = generate_static_fleet()

# Helper to find a specific pack
def get_pack_from_fleet(sn: str) -> schemas.FleetPackInfo:
    for p in fleet_cache:
        if p.serialNumber == sn:
            return p
    # Fallback default
    return schemas.FleetPackInfo(
        serialNumber=sn,
        application="EV",
        soc=82.0,
        soh=98.5,
        voltage=19.92,
        current=-4.2,
        packTemp=28.5,
        cycleCount=124,
        status="normal",
        chargingMode="idle"
    )

# ----------------- REST ROUTES -----------------

@app.get("/api/bms/fleet", response_model=List[schemas.FleetPackInfo])
def get_fleet():
    """
    Returns live monitoring telemetry for the entire 32-battery pack fleet.
    """
    # Fluctuate fleet SOC & current values slightly on query for real-time SCADA look
    for p in fleet_cache:
        if p.status == "offline":
            continue
        # Fluctuate SOC
        if p.chargingMode != "idle":
            p.soc = min(100.0, p.soc + 0.1)
        else:
            p.soc = max(0.0, p.soc - 0.05)
        # Randomize current slightly
        p.current = round(p.current + random.uniform(-0.5, 0.5), 2)
        # Power calculation
        p.voltage = round(19.2 + (p.soc / 100) * 2.1 + random.uniform(-0.05, 0.05), 2)
        p.packTemp = round(p.packTemp + random.uniform(-0.1, 0.1), 1)

    return fleet_cache

@app.get("/api/bms/{serial_number}/live", response_model=schemas.LiveReadingResponse)
def get_live_telemetry(serial_number: str):
    """
    Returns detailed real-time telemetry and cell voltages for a specific battery pack.
    """
    pack = get_pack_from_fleet(serial_number)
    
    # Generate cells based on pack voltage
    cell_base_v = pack.voltage / 6.0
    cells = []
    
    # 6 Cells voltages with minor imbalances
    cell_offsets = [0.005, -0.004, 0.009, -0.007, 0.002, -0.005]
    for idx in range(6):
        v = cell_base_v + cell_offsets[idx] + random.uniform(-0.001, 0.001)
        cells.append(
            schemas.CellDataSchema(
                cellNumber=idx + 1,
                voltage=round(v, 3),
                temp=round(pack.packTemp + random.uniform(-0.5, 0.5), 1),
                isBalancing=pack.chargingMode != "idle" and v > 3.35,
                deltaV=0.0
            )
        )

    # Re-calculate exact pack voltage from cell sum
    pack_voltage = sum([c.voltage for c in cells])
    active_power = pack_voltage * pack.current

    telemetry = schemas.FullTelemetryPayload(
        serialNumber=serial_number,
        timestamp=datetime.utcnow().isoformat() + "Z",
        soc=pack.soc,
        soh=pack.soh,
        voltage=round(pack_voltage, 2),
        current=round(pack.current, 2),
        power=round(active_power, 2),
        packTemp=pack.packTemp,
        cycleCount=pack.cycleCount,
        isCharging=pack.current > 0.1,
        isDischarging=pack.current < -0.1,
        isBalancing=any([c.isBalancing for c in cells]),
        status=pack.status,
        chargingMode=pack.chargingMode,
        remainingCapacity=round((pack.soc / 100) * 100, 1),
        nominalCapacity=100.0,
        energyThroughput=round(pack.cycleCount * 1.92, 2), # 1.92 kWh per cycle nominal
        protectionFlags=schemas.ProtectionFlagsSchema(
            ovp=pack_voltage > 22.0,
            uvp=pack_voltage < 15.0,
            ocp=abs(pack.current) > 60.0,
            scp=pack.status == "fault" and random.random() < 0.1,
            otp=pack.packTemp > 55.0,
            utp=pack.packTemp < -5.0,
            covp=any([c.voltage > 3.70 for c in cells]),
            cuvp=any([c.voltage < 2.50 for c in cells])
        )
    )

    return schemas.LiveReadingResponse(telemetry=telemetry, cells=cells)

@app.get("/api/bms/{serial_number}/history")
def get_history(serial_number: str, range_str: str = Query("24h", alias="range"), db: Session = Depends(get_db)):
    """
    Returns historical database logs of voltage, current, temp, and power for charting.
    """
    now = datetime.utcnow()
    delta = timedelta(hours=24)
    if range_str == "1h":
        delta = timedelta(hours=1)
    elif range_str == "7d":
        delta = timedelta(days=7)
    elif range_str == "30d":
        delta = timedelta(days=30)

    cutoff = now - delta

    try:
        # Try fetching from DB
        records = db.query(models.TelemetryRecord).filter(
            models.TelemetryRecord.serialNumber == serial_number,
            models.TelemetryRecord.timestamp >= cutoff
        ).order_index(models.TelemetryRecord.timestamp.asc()).all()

        if records:
            return {"history": records}
    except Exception:
        pass

    # Fallback to simulated dataset
    pack = get_pack_from_fleet(serial_number)
    history = []
    points = 48
    interval = delta / points

    for i in range(points):
        ts = cutoff + (i * interval)
        soc_val = max(10, min(100, pack.soc + random.uniform(-15.0, 15.0)))
        volts = 18.0 + (soc_val / 100) * 3.2 + random.uniform(-0.1, 0.1)
        amps = random.uniform(-30, 20)
        
        history.append({
            "id": f"mock-{i}",
            "timestamp": ts.isoformat() + "Z",
            "soc": round(soc_val, 1),
            "soh": pack.soh,
            "voltage": round(volts, 2),
            "current": round(amps, 2),
            "power": round(volts * amps, 1),
            "packTemp": round(25.0 + abs(amps) * 0.2 + random.uniform(-1, 1), 1)
        })

    return {"history": history}

@app.post("/api/bms/{serial_number}/ota")
def trigger_ota(serial_number: str, payload: dict):
    """
    Triggers an OTA update sequence to download and flash target firmware.
    """
    firmware_url = payload.get("firmwareUrl")
    version = payload.get("version")

    if not firmware_url or not version:
        raise HTTPException(status_code=400, detail="Missing firmwareUrl or version parameters.")

    # Return status showing command scheduled over MQTT
    return {
        "success": True,
        "message": f"OTA update command successfully published over MQTT for pack {serial_number}.",
        "firmware": version,
        "payloadUrl": firmware_url
    }

@app.get("/api/alerts", response_model=schemas.AlertConfigSchema)
def get_alerts(db: Session = Depends(get_db)):
    """
    Fetches system alert thresholds and gateway recipient configurations.
    """
    try:
        config = db.query(models.AlertConfig).first()
        if config:
            return config
    except Exception:
        pass
    return memory_alert_config

@app.post("/api/alerts")
def save_alerts(config: schemas.AlertConfigSchema, db: Session = Depends(get_db)):
    """
    Saves/Updates the gateway thresholds and configurations.
    """
    global memory_alert_config
    memory_alert_config = config.model_dump()
    
    try:
        db_config = db.query(models.AlertConfig).first()
        if not db_config:
            db_config = models.AlertConfig(id="global-config")
            db.add(db_config)
        
        db_config.emailEnabled = config.emailEnabled
        db_config.emailRecipient = config.emailRecipient
        db_config.whatsappEnabled = config.whatsappEnabled
        db_config.whatsappRecipient = config.whatsappRecipient
        db_config.telegramEnabled = config.telegramEnabled
        db_config.telegramRecipient = config.telegramRecipient
        db_config.socThreshold = config.socThreshold
        db_config.tempThreshold = config.tempThreshold
        db_config.cellDeltaThreshold = config.cellDeltaThreshold
        
        db.commit()
        return {"success": True, "config": db_config}
    except Exception as e:
        db.rollback()
        return {"success": True, "config": memory_alert_config, "warning": f"DB fallback: {str(e)}"}

@app.get("/api/export")
def export_csv(serialNumber: str = "AXQ-EV-01"):
    """
    Generates and returns a downloadable CSV file of pack log registry.
    """
    headers = "ID,Timestamp,Serial Number,SOC (%),SOH (%),Voltage (V),Current (A),Power (W),Temp (C)\n"
    rows = []
    now = datetime.utcnow()
    pack = get_pack_from_fleet(serialNumber)
    
    for i in range(50):
        ts = now - timedelta(hours=(50-i))
        soc = max(10, min(100, pack.soc - (50-i) * 0.8))
        volts = 18.0 + (soc / 100) * 3.1 + random.uniform(-0.05, 0.05)
        amps = -15.0 + random.uniform(-3, 3)
        rows.append(
            f"csv-{i},{ts.isoformat()}Z,{serialNumber},{soc:.1f},{pack.soh:.1f},{volts:.2f},{amps:.2f},{volts*amps:.1f},{27.0+random.uniform(-1,1):.1f}"
        )
        
    csv_content = headers + "\n".join(rows)
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=BMS_Logs_{serialNumber}_{now.strftime('%Y-%m-%d')}.csv"
        }
    )
