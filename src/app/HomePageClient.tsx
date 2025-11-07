
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/firebase";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FilePen } from "lucide-react";

export function HomePageClient() {
  const auth = useAuth();
  const router = useRouter();
  
  React.useEffect(() => {
    if (auth.currentUser) {
      router.push('/dashboard');
    }
  }, [auth.currentUser, router]);

  if (auth.isUserLoading || auth.currentUser) {
    return (
        <div className="text-center">
            <p className="text-lg">Loading...</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card className="bg-card/80">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <FilePen className="w-6 h-6 text-primary" />
                    Anonymous Report (VSR)
                </CardTitle>
                <CardDescription>
                    No login required. Your identity will not be recorded.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Submit a Voluntary Safety Report (VSR) to confidentially share safety concerns or observations. Your anonymity is protected.
                </p>
                <Button asChild className="w-full">
                    <Link href="/dashboard/reports/new?anonymous=true">
                        Submit Voluntary Safety Report <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="bg-card/80">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <ArrowRight className="w-6 h-6 text-primary" />
                    Staff Access
                </CardTitle>
                <CardDescription>
                    Requires staff login. Used for regulatory occurrence reporting and management.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Log in to submit Mandatory Occurrence Reports (MOR), manage cases, and view safety analytics dashboards.
                </p>
                <Button asChild className="w-full">
                    <Link href="/login">
                        Log In / Continue as Staff <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
