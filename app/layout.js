import { Manrope, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bengali',
  display: 'swap',
});

import GlobalEffects from './components/GlobalEffects';

export const metadata = {
  title: 'Sheikh Online Service — Fast, Reliable Internet',
  description: 'Sheikh Online Service — fast, reliable internet for a better digital life.',
  themeColor: '#030f26',
  openGraph: {
    title: 'Sheikh Online Service — Fast, Reliable Internet',
    description: 'Reliable, high-speed connectivity designed for the way you live, work and connect.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${notoBengali.variable}`}>
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}
