from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import List, Optional

class CellDataSchema(BaseModel):
    cellNumber: int
    voltage: float
    temp: float
    isBalancing: bool
    deltaV: float

class ProtectionFlagsSchema(BaseModel):
    ovp: bool
    uvp: bool
    ocp: bool
    scp: bool
    otp: bool
    utp: bool
    covp: bool
    cuvp: bool

class TelemetryCreate(BaseModel):
    serialNumber: str
    soc: float
    soh: float
    voltage: float
    current: float
    power: float
    packTemp: float
    cycleCount: int

class TelemetryResponse(BaseModel):
    id: str
    serialNumber: str
    timestamp: datetime
    soc: float
    soh: float
    voltage: float
    current: float
    power: float
    packTemp: float
    cycleCount: int

    model_config = ConfigDict(from_attributes=True)

class FullTelemetryPayload(BaseModel):
    serialNumber: str
    timestamp: str
    soc: float
    soh: float
    voltage: float
    current: float
    power: float
    packTemp: float
    cycleCount: int
    isCharging: bool
    isDischarging: bool
    isBalancing: bool
    status: str
    chargingMode: str
    remainingCapacity: float
    nominalCapacity: float
    energyThroughput: float
    protectionFlags: ProtectionFlagsSchema

class LiveReadingResponse(BaseModel):
    telemetry: FullTelemetryPayload
    cells: List[CellDataSchema]

class FaultCreate(BaseModel):
    serialNumber: str
    code: str
    message: str
    severity: str

class FaultResponse(BaseModel):
    id: str
    serialNumber: str
    timestamp: datetime
    code: str
    message: str
    severity: str
    resolved: bool
    resolvedAt: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

class AlertConfigSchema(BaseModel):
    emailEnabled: bool
    emailRecipient: str
    whatsappEnabled: bool
    whatsappRecipient: str
    telegramEnabled: bool
    telegramRecipient: str
    socThreshold: float
    tempThreshold: float
    cellDeltaThreshold: float

    model_config = ConfigDict(from_attributes=True)

class FleetPackInfo(BaseModel):
    serialNumber: str
    application: str # EV, Robotics, Drone, Solar, OEM
    soc: float
    soh: float
    voltage: float
    current: float
    packTemp: float
    cycleCount: int
    status: str # normal, warning, fault, offline
    chargingMode: str # idle, bulk, absorption, float
