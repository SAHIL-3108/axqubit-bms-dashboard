import { useState, useRef, useCallback } from 'react';
import { useBmsStore } from '@/store/bmsStore';
import { OtaStatus } from '@/types/bms';

export function useOta(serialNumber: string) {
  const { otaState, updateOtaState } = useBmsStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const simulateProgress = useCallback(
    (
      targetStatus: OtaStatus,
      nextStatus: OtaStatus,
      messageCallback: (progress: number) => string,
      completionCallback: () => void
    ) => {
      let progress = 0;
      updateOtaState({ status: targetStatus, progress, message: messageCallback(0) });

      timerRef.current = setInterval(() => {
        const increment = Math.floor(Math.random() * 4) + 1; // 1 to 4%
        progress = Math.min(100, progress + increment);
        
        updateOtaState({
          progress,
          message: messageCallback(progress),
        });

        if (progress >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          completionCallback();
        }
      }, 400);
    },
    [updateOtaState]
  );

  const startOtaUpdate = useCallback(
    async (firmwareUrl: string, targetVersion: string) => {
      if (!serialNumber) return;

      // Cancel any ongoing timer
      if (timerRef.current) clearInterval(timerRef.current);

      updateOtaState({
        status: 'checking',
        progress: 0,
        message: 'Querying update server for firmware signature...',
        error: null,
      });

      try {
        // Notify backend (which publishes OTA command over MQTT)
        const response = await fetch('/api/ota', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ serialNumber, firmwareUrl, version: targetVersion }),
        });

        if (!response.ok) {
          throw new Error('Failed to transmit OTA command to broker');
        }

        // Simulating the MCU update lifecycle
        // Stage 1: Checking (1.5s)
        setTimeout(() => {
          updateOtaState({
            status: 'ready',
            message: `Firmware package verified. Target version: ${targetVersion}. Starting download...`,
          });

          // Stage 2: Downloading (400ms tick progress)
          setTimeout(() => {
            simulateProgress(
              'downloading',
              'flashing',
              (p) => `Downloading binary payload: ${p}%`,
              () => {
                // Stage 3: Flashing (400ms tick progress)
                simulateProgress(
                  'flashing',
                  'verifying',
                  (p) => {
                    if (p < 25) return `Erasing flash partition: ${p}%`;
                    if (p < 75) return `Writing firmware pages: ${p}%`;
                    return `Verifying block checksums: ${p}%`;
                  },
                  () => {
                    // Stage 4: Verifying (1.5s)
                    updateOtaState({
                      status: 'verifying',
                      progress: 100,
                      message: 'Verifying flash cryptographic signature...',
                    });

                    setTimeout(() => {
                      // Stage 5: Complete (2s)
                      updateOtaState({
                        status: 'complete',
                        progress: 100,
                        message: 'Firmware verification successful. Rebooting MCU...',
                      });

                      setTimeout(() => {
                        updateOtaState({
                          status: 'idle',
                          progress: 0,
                          currentVersion: targetVersion,
                          message: `System successfully updated to ${targetVersion}`,
                        });
                      }, 2500);
                    }, 1500);
                  }
                );
              }
            );
          }, 1200);
        }, 1500);

      } catch (err: any) {
        console.error('[OTA Hook] Error:', err);
        updateOtaState({
          status: 'error',
          progress: 0,
          message: 'OTA process aborted',
          error: err.message || 'Transmission failed',
        });
      }
    },
    [serialNumber, updateOtaState, simulateProgress]
  );

  const resetOta = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    updateOtaState({
      status: 'idle',
      progress: 0,
      message: 'System idle',
      error: null,
    });
  }, [updateOtaState]);

  return {
    otaState,
    startOtaUpdate,
    resetOta,
  };
}
