import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime
from database import Base

def generate_uuid():
    return str(uuid.uuid4())

class TelemetryRecord(Base):
    __tablename__ = "telemetry_records"

    id = Column(String, primary_key=True, default=generate_uuid)
    serialNumber = Column(String, index=True, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
    soc = Column(Float, nullable=False)
    soh = Column(Float, nullable=False)
    voltage = Column(Float, nullable=False)
    current = Column(Float, nullable=False)
    power = Column(Float, nullable=False)
    packTemp = Column(Float, nullable=False)
    cycleCount = Column(Integer, nullable=False)

class FaultEvent(Base):
    __tablename__ = "fault_events"

    id = Column(String, primary_key=True, default=generate_uuid)
    serialNumber = Column(String, index=True, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
    code = Column(String, nullable=False)
    message = Column(String, nullable=False)
    severity = Column(String, nullable=False) # info, warning, critical
    resolved = Column(Boolean, default=False, nullable=False)
    resolvedAt = Column(DateTime, nullable=True)

class AlertConfig(Base):
    __tablename__ = "alert_configs"

    id = Column(String, primary_key=True, default="global-config")
    emailEnabled = Column(Boolean, default=True, nullable=False)
    emailRecipient = Column(String, default="admin@axqubit.com", nullable=False)
    whatsappEnabled = Column(Boolean, default=False, nullable=False)
    whatsappRecipient = Column(String, default="+919999999999", nullable=False)
    telegramEnabled = Column(Boolean, default=False, nullable=False)
    telegramRecipient = Column(String, default="@axqubit_bms_bot", nullable=False)
    socThreshold = Column(Float, default=20.0, nullable=False)
    tempThreshold = Column(Float, default=55.0, nullable=False)
    cellDeltaThreshold = Column(Float, default=50.0, nullable=False)
