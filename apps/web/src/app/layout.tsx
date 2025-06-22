
import { Providers } from '@/app/providers'
import { Toaster } from 'sonner'
import '@/styles/globals.css';
import '@/lib/polyfills'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers> 
      </body>
    </html>
  );
}
