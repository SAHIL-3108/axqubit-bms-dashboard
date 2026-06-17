export interface CellData {
  cellNumber: number; // 1 to 6
  voltage: number;    // In Volts, e.g., 3.325V
  temp: number;       // In °C
  isBalancing: boolean;
  deltaV: number;     // In Volts, cell voltage - pack average
}

export interface ProtectionFlags {
  ovp: boolean;  // Over Voltage Protection (Pack)
  uvp: boolean;  // Under Voltage Protection (Pack)
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
  soc: number;              // 0 to 100%
  soh: number;              // 0 to 100%
  voltage: number;          // In Volts
  current: number;          // In Amperes (positive for charge, negative for discharge)
  power: number;            // In Watts
  packTemp: number;         // In °C
  cycleCount: number;
  isCharging: boolean;
  isDischarging: boolean;
  isBalancing: boolean;
  status: 'normal' | 'warning' | 'fault' | 'offline';
  chargingMode: 'idle' | 'bulk' | 'absorption' | 'float';
  remainingCapacity: number; // In Ah
  nominalCapacity: number;   // In Ah
  energyThroughput: number;  // In kWh
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
  progress: number; // 0 to 100
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
  socThreshold: number;         // Below this triggers warning
  tempThreshold: number;        // Above this triggers warning
  cellDeltaThreshold: number;   // Above this (in mV) triggers warning (e.g. 50mV)
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
