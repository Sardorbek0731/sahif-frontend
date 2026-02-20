import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | sahif",
  openGraph: {
    title: "404 | sahif",
    images: [
      {
        url: "https://sahif.vercel.app/icon.png",
        width: 829,
        height: 829,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "404 | sahif",
    images: ["https://sahif.vercel.app/icon.png"],
  },
};

export default function CatchAllPage() {
  notFound();
}
