import { cookies } from "next/headers";

import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { DEFAULT_LOCATION_ID } from "@/constants";
import { getInitialTheme } from "@/lib/theme";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const initialTheme = getInitialTheme(cookieStore);
  const locCookie =
    cookieStore.get("location-id")?.value ?? DEFAULT_LOCATION_ID;
  const confirmedCookie =
    cookieStore.get("location-confirmed")?.value === "true";

  return (
    <>
      <Header
        initialTheme={initialTheme}
        initialLocationId={locCookie}
        initialConfirmed={confirmedCookie}
      />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
