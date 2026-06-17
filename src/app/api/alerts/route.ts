import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { AlertConfig } from '@/types/bms';

// In-memory fallback cache if PostgreSQL is offline or migrations have not run yet
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

export async function GET() {
  try {
    // Attempt database query
    let config = await prisma.alertConfig.findFirst();

    if (!config) {
      // Seed default config in database
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
  } catch (err) {
    console.warn('[Alerts API] Database query failed. Serving in-memory fallback config.');
    return NextResponse.json({ config: memoryAlertConfig });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AlertConfig;

    try {
      // Upsert record: find 'global-config' or create
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

      // Update in-memory cache as well
      memoryAlertConfig = body;

      return NextResponse.json({ success: true, config: updatedConfig });
    } catch (dbErr) {
      console.warn('[Alerts API] Database save failed. Saving to in-memory store.');
      memoryAlertConfig = body;
      return NextResponse.json({ success: true, config: memoryAlertConfig, fallback: true });
    }
  } catch (error) {
    console.error('[Alerts API] Error saving alert configuration:', error);
    return NextResponse.json({ error: 'Failed to update configurations' }, { status: 500 });
  }
}
