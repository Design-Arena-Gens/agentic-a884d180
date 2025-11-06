import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Hoopra Search',
  description: 'Hoopra Search ? Ak?ll?, sade, h?zl?.',
  metadataBase: new URL('https://agentic-a884d180.vercel.app'),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}
