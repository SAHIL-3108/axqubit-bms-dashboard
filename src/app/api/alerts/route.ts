import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { AlertConfig } from '@/types/bms';

let memoryAlertConfig: AlertConfig = {
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

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function GET() {
  try {
    // Attempt proxying to FastAPI
    const res = await fetch(`${BACKEND_URL}/api/alerts`, { cache: 'no-store' });
    if (!res.ok) throw new Error('FastAPI offline');
    const data = await res.json();
    return NextResponse.json({ config: data });
  } catch (err) {
    // Local DB fallback
    try {
      let config = await prisma.alertConfig.findFirst();
      if (!config) {
        config = await prisma.alertConfig.create({
          data: {
            id: 'global-config',
            emailEnabled: memoryAlertConfig.emailEnabled,
            emailRecipient: memoryAlertConfig.emailRecipient,
            whatsappEnabled: memoryAlertConfig.whatsappEnabled,
            whatsappRecipient: memoryAlertConfig.whatsappRecipient,
            telegramEnabled: memoryAlertConfig.telegramEnabled,
            telegramRecipient: memoryAlertConfig.telegramRecipient,
            socThreshold: memoryAlertConfig.socThreshold,
            tempThreshold: memoryAlertConfig.tempThreshold,
            cellDeltaThreshold: memoryAlertConfig.cellDeltaThreshold,
          },
        });
      }
      return NextResponse.json({ config });
    } catch (dbErr) {
      return NextResponse.json({ config: memoryAlertConfig });
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AlertConfig;

    try {
      // Attempt proxying to FastAPI
      const res = await fetch(`${BACKEND_URL}/api/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('FastAPI offline');
      const data = await res.json();
      return NextResponse.json(data);
    } catch (err) {
      // Local DB fallback
      try {
        const updatedConfig = await prisma.alertConfig.upsert({
          where: { id: 'global-config' },
          update: {
            emailEnabled: body.emailEnabled,
            emailRecipient: body.emailRecipient,
            whatsappEnabled: body.whatsappEnabled,
            whatsappRecipient: body.whatsappRecipient,
            telegramEnabled: body.telegramEnabled,
            telegramRecipient: body.telegramRecipient,
            socThreshold: body.socThreshold,
            tempThreshold: body.tempThreshold,
            cellDeltaThreshold: body.cellDeltaThreshold,
          },
          create: {
            id: 'global-config',
            emailEnabled: body.emailEnabled,
            emailRecipient: body.emailRecipient,
            whatsappEnabled: body.whatsappEnabled,
            whatsappRecipient: body.whatsappRecipient,
            telegramEnabled: body.telegramEnabled,
            telegramRecipient: body.telegramRecipient,
            socThreshold: body.socThreshold,
            tempThreshold: body.tempThreshold,
            cellDeltaThreshold: body.cellDeltaThreshold,
          },
        });

        memoryAlertConfig = body;
        return NextResponse.json({ success: true, config: updatedConfig });
      } catch (dbErr) {
        memoryAlertConfig = body;
        return NextResponse.json({ success: true, config: memoryAlertConfig, fallback: true });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update configurations' }, { status: 500 });
  }
}
