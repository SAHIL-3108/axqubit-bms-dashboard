import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'AXQUBIT BMS6000 Smart Battery Management System Dashboard',
  description:
    'Advanced IoT SaaS battery intelligence, cell diagnostics, SOH predictions, and real-time telemetry for AXQUBIT Technologies BMS6000 Series.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full overflow-hidden`}>
      <body className="h-full bg-[#0a0c0f] text-[#f3f4f6] antialiased">
        <div className="flex h-screen w-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main workspace */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Topbar */}
            <Topbar />

            {/* Scrollable page body */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
