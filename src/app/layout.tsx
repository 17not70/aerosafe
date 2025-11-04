
'use client';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider, useAuth } from '@/firebase';
import { usePathname } from 'next/navigation';
import React from 'react';

// Metadata cannot be exported from a client component.
// We can set it in a server component that wraps this, or handle it differently if needed.
// For now, we'll keep it simple.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>AeroSafe Insights</title>
        <meta name="description" content="A Safety Assessment Tool for airlines and regulators." />
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


function AuthGatedContent({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useAuth();
  const pathname = usePathname();

  const isAuthRoute = pathname.startsWith('/dashboard');

  if (isUserLoading) {
    // You can render a global loading spinner here
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // If user is not logged in and tries to access a protected route,
  // you might want to redirect them, but for now we just won't render the children.
  // Next.js router might handle the redirect based on page logic.
  if (!user && isAuthRoute) {
     // Or a redirect component
    if (typeof window !== 'undefined') {
        window.location.href = '/login';
    }
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="text-xl">Redirecting to login...</div>
        </div>
    );
  }

  return <>{children}</>;
}
