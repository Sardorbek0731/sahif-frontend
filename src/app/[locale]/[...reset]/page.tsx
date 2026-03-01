import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | sahif",
  openGraph: {
    title: "404 | sahif",
    images: [
      {
        url: "https://sahif.vercel.app/logo.png",
        width: 512,
        height: 512,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "404 | sahif",
    images: ["https://sahif.vercel.app/logo.png"],
  },
};

export default function CatchAllPage() {
  notFound();
}
