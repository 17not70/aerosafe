
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Icons } from "@/components/icons";
import { HomePageClient } from "./HomePageClient";
import Image from "next/image";

export default function HomePage() {
  const loginImage = PlaceHolderImages.find(
    (image) => image.id === "login-background"
  );
  
  return (
    <div className="relative min-h-screen w-full">
      {loginImage && (
        <Image
          src={loginImage.imageUrl}
          alt={loginImage.description}
          data-ai-hint={loginImage.imageHint}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center mb-12">
            <Icons.logo className="w-24 h-24 mx-auto text-primary" />
            <h1 className="text-4xl font-bold font-headline mt-4">AeroSafe Insights</h1>
            <p className="text-lg text-muted-foreground mt-2">Safety Reporting Gateway</p>
        </div>
        <HomePageClient />
      </div>
    </div>
  );
}
