import '@/styles/globals.scss';

import type { ReactNode } from 'react';

export const metadata = {
  title: 'Craftyverse',
  description: 'The all-inclusive learning operating system',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
