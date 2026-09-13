import { create } from 'zustand';
import {
  BmsTelemetry,
  CellData,
  BmsHistoryItem,
  FaultEvent,
  OtaState,
  AlertConfig,
  UserRole,
  FleetPackInfo,
  CommProtocolState,
  ProtocolSetting,
} from '@/types/bms';

// Dashboard navigation tab type
export type DashTab = 'fleet' | 'diagnostics' | 'api-docs';

interface BmsState {
  telemetry: BmsTelemetry | null;
  cells: CellData[];
  history: BmsHistoryItem[];
  faults: FaultEvent[];
  connectionState: 'connected' | 'connecting' | 'disconnected';
  otaState: OtaState;
  alertConfig: AlertConfig;

  // New V2.0 State
  activeRole: UserRole;
  selectedSerialNumber: string;
  fleet: FleetPackInfo[];
  commProtocols: CommProtocolState;

  // Shared navigation state (sidebar ↔ dashboard)
  activeDashTab: DashTab;
  pendingScrollId: string | null; // section id to scroll to after tab switch

  // Actions
  setTelemetry: (telemetry: BmsTelemetry) => void;
  updateTelemetry: (data: Partial<BmsTelemetry>) => void;
  setCells: (cells: CellData[]) => void;
  updateCell: (cellNumber: number, data: Partial<CellData>) => void;
  setHistory: (history: BmsHistoryItem[]) => void;
  addHistoryItem: (item: BmsHistoryItem) => void;
  setFaults: (faults: FaultEvent[]) => void;
  addFault: (fault: FaultEvent) => void;
  resolveFault: (id: string) => void;
  setConnectionState: (state: 'connected' | 'connecting' | 'disconnected') => void;
  setOtaState: (otaState: OtaState) => void;
  updateOtaState: (data: Partial<OtaState>) => void;
  setAlertConfig: (config: AlertConfig) => void;
  updateAlertConfig: (data: Partial<AlertConfig>) => void;

  // New V2.0 Actions
  setActiveRole: (role: UserRole) => void;
  setSelectedSerialNumber: (sn: string) => void;
  setFleet: (fleet: FleetPackInfo[]) => void;
  updateCommProtocol: (protocol: keyof CommProtocolState, data: Partial<ProtocolSetting>) => void;

  // Navigation actions
  setActiveDashTab: (tab: DashTab) => void;
  setPendingScrollId: (id: string | null) => void;
  navigateTo: (tab: DashTab, scrollId?: string) => void;
}

const initialOtaState: OtaState = {
  status: 'idle',
  progress: 0,
  currentVersion: 'v1.0.0',
  latestVersion: 'v1.0.0',
  message: 'System up to date',
  error: null,
};

const initialAlertConfig: AlertConfig = {
  emailEnabled: true,
  emailRecipient: 'admin@axqubit.com',
  whatsappEnabled: false,
  whatsappRecipient: '+919999999999',
  telegramEnabled: false,
  telegramRecipient: '@axqubit_bms_bot',
  socThreshold: 20,
  tempThreshold: 55,
  cellDeltaThreshold: 50,
};

const initialCells: CellData[] = Array.from({ length: 6 }, (_, i) => ({
  cellNumber: i + 1,
  voltage: 3.3,
  temp: 25.0,
  isBalancing: false,
  deltaV: 0,
}));

const initialCommProtocols: CommProtocolState = {
  uart: { enabled: true, status: 'connected', detail: '115200 bps (8N1)' },
  can: { enabled: true, status: 'connected', detail: '500 Kbps (2.0B)' },
  rs485: { enabled: false, status: 'disabled', detail: 'Node ID: 0x01' },
  ble: { enabled: false, status: 'disabled', detail: 'Disconnected' },
  mqtt: { enabled: true, status: 'connected', detail: 'HiveMQ Secure Websocket' },
};

export const useBmsStore = create<BmsState>((set) => ({
  telemetry: null,
  cells: initialCells,
  history: [],
  faults: [],
  connectionState: 'disconnected',
  otaState: initialOtaState,
  alertConfig: initialAlertConfig,

  // New V2.0 State
  activeRole: 'admin',
  selectedSerialNumber: 'AXQ-EV-01',
  fleet: [],
  commProtocols: initialCommProtocols,

  // Shared navigation state
  activeDashTab: 'fleet',
  pendingScrollId: null,

  setTelemetry: (telemetry) => set({ telemetry }),
  updateTelemetry: (data) =>
    set((state) => ({
      telemetry: state.telemetry ? { ...state.telemetry, ...data } : (data as BmsTelemetry),
    })),
  setCells: (cells) => set({ cells }),
  updateCell: (cellNumber, data) =>
    set((state) => ({
      cells: state.cells.map((cell) =>
        cell.cellNumber === cellNumber ? { ...cell, ...data } : cell
      ),
    })),
  setHistory: (history) => set({ history }),
  addHistoryItem: (item) =>
    set((state) => {
      const newHistory = [...state.history, item];
      if (newHistory.length > 60) {
        newHistory.shift();
      }
      return { history: newHistory };
    }),
  setFaults: (faults) => set({ faults }),
  addFault: (fault) =>
    set((state) => {
      if (state.faults.some((f) => f.code === fault.code && !f.resolved)) {
        return state;
      }
      return { faults: [fault, ...state.faults] };
    }),
  resolveFault: (id) =>
    set((state) => ({
      faults: state.faults.map((f) =>
        f.id === id
          ? { ...f, resolved: true, resolvedAt: new Date().toISOString() }
          : f
      ),
    })),
  setConnectionState: (state) => set({ connectionState: state }),
  setOtaState: (otaState) => set({ otaState }),
  updateOtaState: (data) =>
    set((state) => ({ otaState: { ...state.otaState, ...data } })),
  setAlertConfig: (alertConfig) => set({ alertConfig }),
  updateAlertConfig: (data) =>
    set((state) => ({ alertConfig: { ...state.alertConfig, ...data } })),

  // New V2.0 Actions
  setActiveRole: (role) => set({ activeRole: role }),
  setSelectedSerialNumber: (sn) => set({ selectedSerialNumber: sn }),
  setFleet: (fleet) => set({ fleet }),
  updateCommProtocol: (protocol, data) =>
    set((state) => ({
      commProtocols: {
        ...state.commProtocols,
        [protocol]: { ...state.commProtocols[protocol], ...data },
      },
    })),

  // Navigation actions
  setActiveDashTab: (tab) => set({ activeDashTab: tab }),
  setPendingScrollId: (id) => set({ pendingScrollId: id }),
  navigateTo: (tab, scrollId) => set({ activeDashTab: tab, pendingScrollId: scrollId ?? null }),
}));
