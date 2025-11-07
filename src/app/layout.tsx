
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase';
import { AuthGatedContent } from './AuthGatedContent';

// Metadata must be exported from a Server Component.
export const metadata = {
  title: 'AeroSafe Insights',
  description: 'A Safety Assessment Tool for airlines and regulators.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <AuthGatedContent>
            {children}
          </AuthGatedContent>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
