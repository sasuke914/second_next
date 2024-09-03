import '@/app/ui/global.css';
import { inter, raleway } from './ui/fonts';
import AuthProvider from './lib/contexts/authContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${raleway.className} antialiased  w-full md:max-w-[1440px] mx-auto`}>{children}</body>
      </html>
    </AuthProvider>
  );
}
