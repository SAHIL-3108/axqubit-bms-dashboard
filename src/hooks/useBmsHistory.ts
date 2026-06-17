import { useState, useEffect, useCallback } from 'react';
import { BmsHistoryItem } from '@/types/bms';

export function useBmsHistory(serialNumber: string, range: string = '24h') {
  const [history, setHistory] = useState<BmsHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!serialNumber) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/bms/history?serialNumber=${serialNumber}&range=${range}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch history: ${res.statusText}`);
      }
      const data = await res.json();
      setHistory(data.history || []);
    } catch (err: any) {
      console.error('[History Hook] Error fetching:', err);
      setError(err instanceof Error ? err : new Error(err?.toString()));
    } finally {
      setLoading(false);
    }
  }, [serialNumber, range]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    loading,
    error,
    refetch: fetchHistory,
  };
}
