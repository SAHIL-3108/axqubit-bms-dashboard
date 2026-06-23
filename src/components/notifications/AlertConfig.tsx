'use client';

import React, { useEffect, useState } from 'react';
import { Settings, Save, Mail, MessageSquare, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { AlertConfig } from '@/types/bms';
import { useBmsStore } from '@/store/bmsStore';

export default function AlertConfigComponent() {
  const activeRole = useBmsStore((state) => state.activeRole);
  const isViewOnly = activeRole === 'customer';

  const [config, setConfig] = useState<AlertConfig>({
    emailEnabled: true,
    emailRecipient: 'admin@axqubit.com',
    whatsappEnabled: false,
    whatsappRecipient: '+919999999999',
    telegramEnabled: false,
    telegramRecipient: '@axqubit_bms_bot',
    socThreshold: 20,
    tempThreshold: 55,
    cellDeltaThreshold: 50,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch settings from database on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/alerts');
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            setConfig(data.config);
          }
        }
      } catch (err) {
        console.error('Failed to load alert configuration:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewOnly) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error('Save operation failed');
      const data = await res.json();

      setStatusMessage({ type: 'success', text: 'Alert configurations saved successfully!' });
      // Update global store
      useBmsStore.getState().setAlertConfig(config);
    } catch (err: any) {
      console.error('Failed to save configuration:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Server error occurred while saving.' });
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel flex h-80 items-center justify-center rounded-xl text-xs text-[#9ca3af]">
        Loading Security Registers...
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl p-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <Settings className="h-4 w-4 text-[#00d4ff]" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
              Alert Gateways
            </span>
            <h3 className="text-sm font-bold text-white">System Notification Config</h3>
          </div>
        </div>
        {isViewOnly && (
          <span className="text-[9px] font-bold text-[#ffb300] bg-[#ffb300]/10 px-2 py-0.5 rounded uppercase">
            View Only Mode
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Two column layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Column 1: Channels & Toggles */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1">
              <span>Alert Dispatches</span>
            </h4>

            {/* Email dispatch */}
            <div className="rounded-lg bg-white/5 border border-white/5 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-white">
                  <Mail className="h-4 w-4 text-[#00d4ff]" />
                  <span className="text-xs font-bold">Email Notifications</span>
                </div>
                {/* Custom toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.emailEnabled}
                    disabled={isViewOnly}
                    onChange={(e) => setConfig({ ...config, emailEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3.5 after:transition-all peer-checked:bg-[#00d4ff]" />
                </label>
              </div>
              {config.emailEnabled && (
                <input
                  type="email"
                  value={config.emailRecipient}
                  disabled={isViewOnly}
                  onChange={(e) => setConfig({ ...config, emailRecipient: e.target.value })}
                  placeholder="enter.recipient@mail.com"
                  required
                  className="w-full rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
                />
              )}
            </div>

            {/* WhatsApp dispatch */}
            <div className="rounded-lg bg-white/5 border border-white/5 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-white">
                  <MessageSquare className="h-4 w-4 text-[#00e676]" />
                  <span className="text-xs font-bold">WhatsApp (WATI API)</span>
                </div>
                {/* Custom toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.whatsappEnabled}
                    disabled={isViewOnly}
                    onChange={(e) => setConfig({ ...config, whatsappEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3.5 after:transition-all peer-checked:bg-[#00d4ff]" />
                </label>
              </div>
              {config.whatsappEnabled && (
                <input
                  type="tel"
                  value={config.whatsappRecipient}
                  disabled={isViewOnly}
                  onChange={(e) => setConfig({ ...config, whatsappRecipient: e.target.value })}
                  placeholder="e.g. +919999999999"
                  required
                  className="w-full rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
                />
              )}
            </div>

            {/* Telegram dispatch */}
            <div className="rounded-lg bg-white/5 border border-white/5 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-white">
                  <Send className="h-4 w-4 text-[#ffb300]" />
                  <span className="text-xs font-bold">Telegram Channel</span>
                </div>
                {/* Custom toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.telegramEnabled}
                    disabled={isViewOnly}
                    onChange={(e) => setConfig({ ...config, telegramEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3.5 after:transition-all peer-checked:bg-[#ffb300]" />
                </label>
              </div>
              {config.telegramEnabled && (
                <input
                  type="text"
                  value={config.telegramRecipient}
                  disabled={isViewOnly}
                  onChange={(e) => setConfig({ ...config, telegramRecipient: e.target.value })}
                  placeholder="e.g. @channel_or_chat_id"
                  required
                  className="w-full rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
                />
              )}
            </div>
          </div>

          {/* Column 2: Threshold limits */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1">
              <span>Trip Thresholds</span>
            </h4>

            <div className="rounded-lg bg-white/5 border border-white/5 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-[9px] font-extrabold uppercase tracking-widest text-[#9ca3af] bg-white/[0.02]">
                    <th className="py-3 px-4">Parameter Register</th>
                    <th className="py-3 px-4 w-28 text-right">Value Input</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                  {/* SOC */}
                  <tr>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">Low SOC Trip Limit</div>
                      <div className="text-[10px] text-[#9ca3af] mt-0.5">Triggers warning when state of charge drops below limit.</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <input
                          type="number"
                          value={config.socThreshold}
                          disabled={isViewOnly}
                          onChange={(e) => setConfig({ ...config, socThreshold: parseInt(e.target.value, 10) || 0 })}
                          min={0}
                          max={100}
                          className="w-16 rounded border border-white/10 bg-white/5 py-1 text-center font-mono font-bold text-white focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
                        />
                        <span className="text-[10px] text-[#9ca3af] font-bold">%</span>
                      </div>
                    </td>
                  </tr>

                  {/* Temperature */}
                  <tr>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">High Temp Trip Limit</div>
                      <div className="text-[10px] text-[#9ca3af] mt-0.5">Triggers warning when temperature exceeds rating.</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <input
                          type="number"
                          value={config.tempThreshold}
                          disabled={isViewOnly}
                          onChange={(e) => setConfig({ ...config, tempThreshold: parseInt(e.target.value, 10) || 0 })}
                          min={0}
                          max={120}
                          className="w-16 rounded border border-white/10 bg-white/5 py-1 text-center font-mono font-bold text-white focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
                        />
                        <span className="text-[10px] text-[#9ca3af] font-bold">°C</span>
                      </div>
                    </td>
                  </tr>

                  {/* Cell Delta */}
                  <tr>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">Cell Delta Balance Limit</div>
                      <div className="text-[10px] text-[#9ca3af] mt-0.5">Triggers warning when cell voltage difference is exceeded.</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <input
                          type="number"
                          value={config.cellDeltaThreshold}
                          disabled={isViewOnly}
                          onChange={(e) => setConfig({ ...config, cellDeltaThreshold: parseInt(e.target.value, 10) || 0 })}
                          min={0}
                          max={500}
                          className="w-16 rounded border border-white/10 bg-white/5 py-1 text-center font-mono font-bold text-white focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
                        />
                        <span className="text-[10px] text-[#9ca3af] font-bold">mV</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Status Messages / Alerts */}
        {statusMessage && (
          <div
            className={`flex items-center space-x-2 rounded-lg p-3 text-xs border ${
              statusMessage.type === 'success'
                ? 'bg-[#00e676]/10 border-[#00e676]/30 text-[#00e676]'
                : 'bg-[#ff3333]/15 border-[#ff3333]/30 text-[#ff3333]'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <ShieldAlert className="h-4 w-4" />
            )}
            <span className="font-bold">{statusMessage.text}</span>
          </div>
        )}

        {/* Form Actions */}
        {!isViewOnly && (
          <div className="flex justify-end pt-3 border-t border-white/5">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#00a3c4] px-5 py-2.5 text-xs font-bold text-background shadow-lg shadow-[#00d4ff]/10 hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="h-4 w-4 stroke-[2.5]" />
              <span>{saving ? 'SAVING REGISTERS...' : 'SAVE ALARM CONFIG'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
