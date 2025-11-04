
'use client';
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useAuth, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { initiateEmailSignIn } from "@/firebase/non-blocking-login";
import React from "react";
import { useRouter } from "next/navigation";
import { doc } from "firebase/firestore";
import type { User } from "@/lib/types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const loginImage = PlaceHolderImages.find(
    (image) => image.id === "login-background"
  );
  const auth = useAuth();
  const router = useRouter();
  const firestore = useFirestore();

  const userRef = useMemoFirebase(() => auth.currentUser ? doc(firestore, "users", auth.currentUser.uid) : null, [firestore, auth.currentUser]);
  const { data: userProfile } = useDoc<User>(userRef);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    initiateEmailSignIn(auth, email, password);
  };
  
  // Dev-only: auto-login logic
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && auth && !auth.currentUser) {
      const email = 'officer@example.com';
      const password = 'password';

      const devLogin = async () => {
        try {
          // Try to sign in first
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
          // If user not found, create it
          if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            try {
              await createUserWithEmailAndPassword(auth, email, password);
            } catch (createError) {
              console.error("Failed to create dev user:", createError);
            }
          } else {
            console.error("Failed to sign in dev user:", error);
          }
        }
      };
      devLogin();
    }
  }, [auth]);


  React.useEffect(() => {
    if (auth.currentUser && userProfile) {
        switch (userProfile.role) {
            case 'Admin':
                router.push('/dashboard/admin');
                break;
            case 'Safety Officer':
                router.push('/dashboard');
                break;
            case 'Reporter':
                router.push('/dashboard/reports');
                break;
            default:
                router.push('/dashboard');
        }
    }
  }, [auth.currentUser, userProfile, router]);

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 mb-4">
                <Icons.logo className="w-10 h-10" />
                <h1 className="text-2xl font-bold font-headline">AeroSafe Insights</h1>
            </Link>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="officer@example.com"
                required
                defaultValue="officer@example.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              <Icons.google className="mr-2 h-4 w-4" />
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Contact Admin
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            data-ai-hint={loginImage.imageHint}
            fill
            className="object-cover"
          />
        )}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
         <div className="absolute bottom-0 left-0 p-8">
            <h2 className="text-3xl font-bold text-white font-headline">Proactive Safety Management, Simplified.</h2>
            <p className="text-white/80 mt-2">Record, classify, and analyze aviation safety reports with ease.</p>
         </div>
      </div>
    </div>
  );
}
