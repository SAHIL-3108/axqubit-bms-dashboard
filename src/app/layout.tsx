import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HeaderNav from '@/components/website/HeaderNav';
import Footer from '@/components/website/Footer';

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
  title: 'AXQUBIT Technologies | Next-Gen BMS, Power Electronics & Edge AI Vision',
  description:
    'Industrial-grade Battery Management Systems (BMS6000), Active Balancing, Industrial SMPS, Pure Sine Inverters, UPS Systems, and Edge AI Vision.',
  keywords: [
    'AXQUBIT',
    'BMS',
    'Battery Management System',
    'BMS6000',
    'LiFePO4 BMS',
    'Active Balancing',
    'Electric Vehicle BMS',
    'Solar ESS',
    'Power Supplies',
    'SMPS',
    'Inverters',
    'ANPR',
    'Vadodara Gujarat'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-[#0a0c0f] text-[#f3f4f6] antialiased flex flex-col font-sans selection:bg-cyan-500 selection:text-black" suppressHydrationWarning>
        <HeaderNav />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
