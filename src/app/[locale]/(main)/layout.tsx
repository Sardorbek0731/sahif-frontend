import { cookies } from "next/headers";

import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import {
  DEFAULT_LOCATION_ID,
  LOCATION_ID_COOKIE,
  LOCATION_CONFIRMED_COOKIE,
} from "@/constants";
import { getInitialTheme } from "@/lib/theme";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const initialTheme = getInitialTheme(cookieStore);
  const locCookie =
    cookieStore.get(LOCATION_ID_COOKIE)?.value || DEFAULT_LOCATION_ID;
  const confirmedCookie =
    cookieStore.get(LOCATION_CONFIRMED_COOKIE)?.value === "true";

  return (
    <>
      <Header
        initialTheme={initialTheme}
        initialLocationId={locCookie}
        initialConfirmed={confirmedCookie}
      />
      <Navbar />
      {children}
    </>
  );
}
