import nodemailer from 'nodemailer';
import axios from 'axios';

// Environment variables
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.mailtrap.io';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '2525', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || 'bms-alerts@axqubit.com';

const WATI_API_ENDPOINT = process.env.WATI_API_ENDPOINT || ''; // E.g., https://api.wati.io
const WATI_API_TOKEN = process.env.WATI_API_TOKEN || '';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

// Cooldown tracker: Key is "channel_code", value is timestamp
const cooldownCache: Record<string, number> = {};
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Check if alert is in cooldown
 */
function isCoolingDown(channel: string, code: string): boolean {
  const key = `${channel}_${code}`;
  const now = Date.now();
  const lastSent = cooldownCache[key];

  if (lastSent && now - lastSent < COOLDOWN_MS) {
    return true;
  }
  return false;
}

/**
 * Update the cooldown timestamp
 */
function updateCooldown(channel: string, code: string) {
  const key = `${channel}_${code}`;
  cooldownCache[key] = Date.now();
}

/**
 * Send Email via Nodemailer SMTP
 */
export async function sendEmailAlert(recipient: string, subject: string, message: string, code: string) {
  if (isCoolingDown('email', code)) {
    console.log(`[Email Cooldown] Suppressed alert for code ${code}`);
    return;
  }

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn('[Alerts] SMTP credentials missing. Logged alert: ', subject, message);
    updateCooldown('email', code);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: SMTP_FROM,
      to: recipient,
      subject: `[BMS ALERT] ${subject}`,
      text: message,
      html: `<div style="font-family: sans-serif; background-color: #0a0c0f; color: #ffffff; padding: 20px; border-radius: 8px;">
        <h2 style="color: #ff3333; border-bottom: 1px solid #333; padding-bottom: 10px;">AXQUBIT BMS6000 Warning</h2>
        <p style="font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
        <div style="background-color: #161b22; padding: 15px; border-left: 4px solid #ff3333; margin: 15px 0;">
          <p style="margin: 0; font-family: monospace;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #8b949e;">This is an automated system alert. Do not reply.</p>
      </div>`,
    });

    console.log(`[Email Alert] Sent successfully to ${recipient}`);
    updateCooldown('email', code);
  } catch (error) {
    console.error('[Email Alert] Error sending email:', error);
  }
}

/**
 * Send WhatsApp Alert via WATI API
 */
export async function sendWhatsAppAlert(recipient: string, message: string, code: string) {
  if (isCoolingDown('whatsapp', code)) {
    console.log(`[WhatsApp Cooldown] Suppressed alert for code ${code}`);
    return;
  }

  if (!WATI_API_ENDPOINT || !WATI_API_TOKEN) {
    console.warn('[Alerts] WATI API configurations missing. WhatsApp alert: ', message);
    updateCooldown('whatsapp', code);
    return;
  }

  try {
    // Standard WATI session message endpoint
    const url = `${WATI_API_ENDPOINT}/api/v1/sendSessionMessage?whatsappNumber=${recipient}`;
    await axios.post(
      url,
      { text: message },
      {
        headers: {
          Authorization: `Bearer ${WATI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`[WhatsApp Alert] Sent successfully to ${recipient}`);
    updateCooldown('whatsapp', code);
  } catch (error) {
    console.error('[WhatsApp Alert] Error sending WhatsApp:', error?.toString());
  }
}

/**
 * Send Telegram Alert via Telegram Bot API
 */
export async function sendTelegramAlert(message: string, code: string) {
  if (isCoolingDown('telegram', code)) {
    console.log(`[Telegram Cooldown] Suppressed alert for code ${code}`);
    return;
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('[Alerts] Telegram API bot token or chat ID missing. Telegram alert: ', message);
    updateCooldown('telegram', code);
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: `⚡ AXQUBIT BMS6000 SYSTEM ALERT ⚡\n\n${message}`,
      parse_mode: 'HTML',
    });

    console.log(`[Telegram Alert] Sent successfully to chat ${TELEGRAM_CHAT_ID}`);
    updateCooldown('telegram', code);
  } catch (error) {
    console.error('[Telegram Alert] Error sending Telegram:', error?.toString());
  }
}

/**
 * Unified dispatch function
 */
export async function dispatchAllAlerts(
  config: {
    emailEnabled: boolean;
    emailRecipient: string;
    whatsappEnabled: boolean;
    whatsappRecipient: string;
    telegramEnabled: boolean;
    telegramRecipient: string;
  },
  code: string,
  subject: string,
  message: string
) {
  const promises = [];

  if (config.emailEnabled && config.emailRecipient) {
    promises.push(sendEmailAlert(config.emailRecipient, subject, message, code));
  }

  if (config.whatsappEnabled && config.whatsappRecipient) {
    promises.push(sendWhatsAppAlert(config.whatsappRecipient, message, code));
  }

  if (config.telegramEnabled) {
    promises.push(sendTelegramAlert(message, code));
  }

  await Promise.all(promises);
}
