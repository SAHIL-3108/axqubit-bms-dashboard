import { useEffect, useRef } from 'react';
import { useBmsStore } from '@/store/bmsStore';
import { mqttService } from '@/lib/mqtt';
import { BmsTelemetry, CellData, BmsHistoryItem } from '@/types/bms';

export function useBmsLive(serialNumber: string) {
  const {
    updateTelemetry,
    setCells,
    connectionState,
    setConnectionState,
    addHistoryItem,
  } = useBmsStore();

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!serialNumber) return;

    let isSubscribed = true;
    setConnectionState('connecting');

    // MQTT subscription topics
    const telemetryTopic = `axqubit/bms/${serialNumber}/telemetry`;
    const cellsTopic = `axqubit/bms/${serialNumber}/cells`;

    // Subscribe to MQTT telemetry
    const unsubscribeTelemetry = mqttService.subscribe(telemetryTopic, (data: Partial<BmsTelemetry>) => {
      if (!isSubscribed) return;
      setConnectionState('connected');
      updateTelemetry(data as BmsTelemetry);

      // Record to chart history
      if (data.voltage !== undefined && data.current !== undefined) {
        addHistoryItem({
          id: Math.random().toString(),
          timestamp: data.timestamp || new Date().toISOString(),
          soc: data.soc || 0,
          soh: data.soh || 0,
          voltage: data.voltage,
          current: data.current,
          power: data.power || 0,
          packTemp: data.packTemp || 0,
        });
      }
    });

    // Subscribe to MQTT cell voltages
    const unsubscribeCells = mqttService.subscribe(cellsTopic, (cells: CellData[]) => {
      if (!isSubscribed) return;
      setCells(cells);
    });

    // Fallback polling loop (Runs every 1000ms)
    // Triggers if MQTT service is not connected
    const startPolling = () => {
      if (pollingIntervalRef.current) return;

      pollingIntervalRef.current = setInterval(async () => {
        const isMqttConnected = mqttService.getConnectionStatus();

        if (!isMqttConnected) {
          setConnectionState('connecting');
          try {
            // Fetch live telemetry (which includes cell data) from REST API fallback
            const res = await fetch(`/api/bms/live?serialNumber=${serialNumber}`);
            if (!res.ok) throw new Error('API failure');
            
            const data = await res.json();
            
            if (isSubscribed) {
              setConnectionState('disconnected'); // Signifies fallback HTTP mode
              updateTelemetry(data.telemetry);
              setCells(data.cells);

              // Record history item
              addHistoryItem({
                id: Math.random().toString(),
                timestamp: data.telemetry.timestamp,
                soc: data.telemetry.soc,
                soh: data.telemetry.soh,
                voltage: data.telemetry.voltage,
                current: data.telemetry.current,
                power: data.telemetry.power,
                packTemp: data.telemetry.packTemp,
              });
            }
          } catch (err) {
            console.warn('[HTTP Fallback] Failed fetching live telemetry:', err);
            if (isSubscribed) {
              setConnectionState('disconnected');
            }
          }
        } else {
          // If MQTT reconnects, Zustand status reflects 'connected'
          setConnectionState('connected');
        }
      }, 1000);
    };

    startPolling();

    return () => {
      isSubscribed = false;
      unsubscribeTelemetry();
      unsubscribeCells();
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [serialNumber, setConnectionState, updateTelemetry, setCells, addHistoryItem]);

  return {
    connectionState,
    isMqtt: connectionState === 'connected',
  };
}
