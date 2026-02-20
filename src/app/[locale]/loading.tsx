import Image from "next/image";
import { images } from "@/data/images";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-between bg-background py-16">
      <div className="flex-1 flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-foreground/10 border-t-foreground"></div>
      </div>

      <div className="flex items-center">
        <Image
          src={images.header.logo}
          width={40}
          height={40}
          className="mr-3 w-10 h-10"
          alt="logo"
        />
        <h1 className="font-asimovian text-3xl text-primary">sahif</h1>
      </div>
    </div>
  );
}
