import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  bookId: number;
  slug: string;
  language: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (bookId: number, language: string) => void;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (bookId: number, language: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const exists = state.items.some(
            (i) => i.bookId === item.bookId && i.language === item.language,
          );
          return exists ? state : { items: [...state.items, item] };
        }),

      removeItem: (bookId, language) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.bookId === bookId && i.language === language),
          ),
        })),

      toggleItem: (item) =>
        set((state) => {
          const exists = state.items.some(
            (i) => i.bookId === item.bookId && i.language === item.language,
          );
          return {
            items: exists
              ? state.items.filter(
                  (i) =>
                    !(i.bookId === item.bookId && i.language === item.language),
                )
              : [...state.items, item],
          };
        }),

      isInWishlist: (bookId, language) =>
        get().items.some((i) => i.bookId === bookId && i.language === language),

      clearWishlist: () => set({ items: [] }),
    }),
    { name: "wishlist" },
  ),
);

export const selectTotalItems = (state: WishlistStore) => state.items.length;
