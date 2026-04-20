import '@/styles/globals.scss';

import type { ReactNode } from 'react';

export const metadata = {
  title: 'Craftyverse',
  description: 'Marketing website for the Craftyverse platform',
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
