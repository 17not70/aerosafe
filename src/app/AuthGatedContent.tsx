
'use client';

import { useAuth } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export function AuthGatedContent({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isAuthRoute = pathname.startsWith('/dashboard');

  useEffect(() => {
    // If we're done loading and there's no user, but we're trying to access a protected route
    if (!isUserLoading && !user && isAuthRoute) {
      router.push('/login');
    }
  }, [user, isUserLoading, isAuthRoute, router]);

  if (isUserLoading) {
    // You can render a global loading spinner here
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  // If no user on an auth route, show loading while redirecting
  if (!user && isAuthRoute) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="text-xl">Redirecting to login...</div>
        </div>
    );
  }


  return <>{children}</>;
}
