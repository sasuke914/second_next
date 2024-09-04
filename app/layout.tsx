import '@/app/ui/global.css';
import { inter, raleway } from './ui/fonts';
import AuthProvider from './lib/contexts/authContext';
import Header from './ui/Header/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${raleway.className} antialiased  w-full md:max-w-[1440px] mx-auto`}>
          <Header />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
