import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';
import { Web3Provider } from '@/components/Web3Provider';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'MockSwap',
  description: 'Buy Carbon Credits using Thai Baht',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider>
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />
            {children}
            <Footer />
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
