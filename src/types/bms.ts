export interface CellData {
  cellNumber: number; // 1 to 6
  voltage: number;    // In Volts
  temp: number;       // In °C
  isBalancing: boolean;
  deltaV: number;     // In Volts, cell voltage - pack average
}

export interface ProtectionFlags {
  ovp: boolean;  // Over Voltage Protection
  uvp: boolean;  // Under Voltage Protection
  ocp: boolean;  // Over Current Protection
  scp: boolean;  // Short Circuit Protection
  otp: boolean;  // Over Temperature Protection
  utp: boolean;  // Under Temperature Protection
  covp: boolean; // Cell Over Voltage Protection
  cuvp: boolean; // Cell Under Voltage Protection
}

export interface BmsTelemetry {
  serialNumber: string;
  timestamp: string;
  soc: number;
  soh: number;
  voltage: number;
  current: number;
  power: number;
  packTemp: number;
  cycleCount: number;
  isCharging: boolean;
  isDischarging: boolean;
  isBalancing: boolean;
  status: 'normal' | 'warning' | 'fault' | 'offline';
  chargingMode: 'idle' | 'bulk' | 'absorption' | 'float';
  remainingCapacity: number;
  nominalCapacity: number;
  energyThroughput: number;
  protectionFlags: ProtectionFlags;
}

export interface FaultEvent {
  id: string;
  timestamp: string;
  code: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  resolved: boolean;
  resolvedAt?: string | null;
}

export type OtaStatus = 'idle' | 'checking' | 'ready' | 'downloading' | 'flashing' | 'verifying' | 'complete' | 'error';

export interface OtaState {
  status: OtaStatus;
  progress: number;
  currentVersion: string;
  latestVersion: string;
  message: string;
  error: string | null;
}

export interface AlertConfig {
  id?: string;
  emailEnabled: boolean;
  emailRecipient: string;
  whatsappEnabled: boolean;
  whatsappRecipient: string;
  telegramEnabled: boolean;
  telegramRecipient: string;
  socThreshold: number;
  tempThreshold: number;
  cellDeltaThreshold: number;
}

export interface BmsHistoryItem {
  id: string;
  timestamp: string;
  soc: number;
  soh: number;
  voltage: number;
  current: number;
  power: number;
  packTemp: number;
}

// ================== NEW V2.0 TYPES ==================

export type UserRole = 'admin' | 'engineer' | 'customer';

export type PackApplication = 'EV' | 'Robotics' | 'Drone' | 'Solar ESS' | 'OEM Pack';

export interface FleetPackInfo {
  serialNumber: string;
  application: PackApplication;
  soc: number;
  soh: number;
  voltage: number;
  current: number;
  packTemp: number;
  cycleCount: number;
  status: 'normal' | 'warning' | 'fault' | 'offline';
  chargingMode: 'idle' | 'bulk' | 'absorption' | 'float';
}

export interface ProtocolSetting {
  enabled: boolean;
  status: 'connected' | 'error' | 'disabled';
  detail: string; // e.g. "115200 bps", "500 Kbps", "Node ID: 0x01", "-65 dBm", "Broker Active"
}

export interface CommProtocolState {
  uart: ProtocolSetting;
  can: ProtocolSetting;
  rs485: ProtocolSetting;
  ble: ProtocolSetting;
  mqtt: ProtocolSetting;
}
