import { Link } from "@/i18n/navigation";
import Categories from "./Categories";
import Search from "./Search";
import { Logo } from "@/components/ui/Logo";
import NavLinks from "./NavLinks";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("auth-token");
  const userName = cookieStore.get("user-name")?.value || "";

  return (
    <nav className="my-container row-between mb-4">
      <Link href="/" className="mr-4 flex items-center">
        <Logo className="mr-2 w-10 h-10" />
        <span className="font-asimovian text-2xl">sahif</span>
      </Link>

      <Categories />
      <Search />

      <div className="flex items-center">
        <NavLinks
          serverAuthenticated={hasToken}
          serverUserName={decodeURIComponent(userName)}
        />
      </div>
    </nav>
  );
}
