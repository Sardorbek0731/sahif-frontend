import Image from "next/image";
import { SKIP_WORDS } from "@/constants";

interface AuthorAvatarProps {
  name: string;
  image?: string;
  size?: number;
  className?: string;
}

export default function AuthorAvatar({
  name,
  image,
  size = 80,
  className = "",
}: AuthorAvatarProps) {
  const initials = name
    .split(" ")
    .filter((n) => !SKIP_WORDS.has(n.toLowerCase()))
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        className={`rounded-full object-cover aspect-square shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-primary/10 border border-primary/50 row-center text-primary font-bold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}
