import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface Props {
  bookId: number;
  slug: string;
  language: string;
  stockCount?: number;
}

export function useBookActions({ bookId, slug, language, stockCount }: Props) {
  const cartItem = useCartStore((s) =>
    s.items.find((i) => i.bookId === bookId && i.language === language),
  );
  const addToCart = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const isInWishlist = useWishlistStore((s) =>
    s.isInWishlist(bookId, language),
  );
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);

  return {
    cartItem,
    isInWishlist,
    addToCart: () => addToCart({ bookId, slug, language }),
    increment: () => {
      const current = cartItem?.quantity ?? 0;
      if (stockCount !== undefined && current >= stockCount) return;
      updateQuantity(bookId, language, current + 1);
    },
    decrement: () => {
      if (!cartItem) return;
      if (cartItem.quantity === 1) {
        removeItem(bookId, language);
      } else {
        updateQuantity(bookId, language, cartItem.quantity - 1);
      }
    },
    toggleWishlist: () => toggleWishlist({ bookId, slug, language }),
  };
}
