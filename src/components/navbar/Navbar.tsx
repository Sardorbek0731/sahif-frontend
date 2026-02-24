import Image from "next/image";
import { Link } from "@/i18n/routing";
import { images } from "@/data/images";
import { Icon } from "@/components/ui/icons/icon";
import { famousSubCategories } from "@/data/categories";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const categories = useTranslations("categories");

  return (
    <nav className="my-container row-between">
      <Link className="flex items-center" href="/">
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

      <div className="flex items-center">
        {famousSubCategories.map((cat, index) => (
          <div
            key={cat.id}
            className={`items-center ${index > 7 ? "hidden xl:flex" : "flex"}`}
          >
            <Link
              href={`/category/${cat.slug}`}
              className="hover:text-primary transition-all leading-none whitespace-nowrap"
            >
              {categories(`${cat.slug}.name`)}
            </Link>
            <span
              className="mx-6 h-4 w-px bg-foreground/20 block"
              aria-hidden="true"
            />
          </div>
        ))}

        <Link
          href="/categories"
          className="flex items-center hover:text-primary transition-all leading-none font-medium shrink-0"
        >
          {categories("all")}
          <Icon name="arrowRight" size={16} className="ml-2" />
        </Link>
      </div>
    </nav>
  );
}
