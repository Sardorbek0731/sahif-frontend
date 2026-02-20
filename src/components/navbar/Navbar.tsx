import Image from "next/image";
import { Link } from "@/i18n/routing";
import { images } from "@/data/images";

export default function Navbar() {
  return (
    <nav className="my-container">
      <Link className="flex items-center mr-18" href="/">
        <Image
          className="mr-3 w-8 h-8"
          width={32}
          height={32}
          src={images.header.logo}
          alt="logo"
          priority
        />
        <span className="font-asimovian text-2xl">sahif</span>
      </Link>
    </nav>
  );
}
