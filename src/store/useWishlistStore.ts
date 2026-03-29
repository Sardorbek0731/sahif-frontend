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

      addItem: (item) => {
        const exists = get().isInWishlist(item.bookId, item.language);
        if (!exists) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },

      removeItem: (bookId, language) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.bookId === bookId && i.language === language),
          ),
        }));
      },

      toggleItem: (item) => {
        const exists = get().isInWishlist(item.bookId, item.language);
        if (exists) {
          get().removeItem(item.bookId, item.language);
        } else {
          get().addItem(item);
        }
      },

      isInWishlist: (bookId, language) =>
        get().items.some((i) => i.bookId === bookId && i.language === language),

      clearWishlist: () => set({ items: [] }),
    }),
    { name: "wishlist" },
  ),
);

export const selectTotalItems = (state: WishlistStore) => state.items.length;