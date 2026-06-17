import { create } from 'zustand';
import { BmsTelemetry, CellData, BmsHistoryItem, FaultEvent, OtaState, AlertConfig } from '@/types/bms';

interface BmsState {
  telemetry: BmsTelemetry | null;
  cells: CellData[];
  history: BmsHistoryItem[];
  faults: FaultEvent[];
  connectionState: 'connected' | 'connecting' | 'disconnected';
  otaState: OtaState;
  alertConfig: AlertConfig;

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
  cellDeltaThreshold: 50, // 50 mV
};

const initialCells: CellData[] = Array.from({ length: 6 }, (_, i) => ({
  cellNumber: i + 1,
  voltage: 3.3, // Nominal voltage of LFP
  temp: 25.0,
  isBalancing: false,
  deltaV: 0,
}));

export const useBmsStore = create<BmsState>((set) => ({
  telemetry: null,
  cells: initialCells,
  history: [],
  faults: [],
  connectionState: 'disconnected',
  otaState: initialOtaState,
  alertConfig: initialAlertConfig,

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
      // Limit history to last 120 items (1 minute at 500ms intervals, or 2 mins at 1s)
      const newHistory = [...state.history, item];
      if (newHistory.length > 120) {
        newHistory.shift();
      }
      return { history: newHistory };
    }),
  setFaults: (faults) => set({ faults }),
  addFault: (fault) =>
    set((state) => {
      // Don't add duplicate active faults
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
}));
