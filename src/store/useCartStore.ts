import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  bookId: number;
  slug: string;
  language: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (bookId: number, language: string) => void;
  updateQuantity: (bookId: number, language: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalUniqueItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.bookId === item.bookId && i.language === item.language,
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.bookId === item.bookId && i.language === item.language
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }));
        }
      },

      removeItem: (bookId, language) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.bookId === bookId && i.language === language),
          ),
        }));
      },

      updateQuantity: (bookId, language, quantity) => {
        if (quantity <= 0) {
          get().removeItem(bookId, language);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.bookId === bookId && i.language === language
              ? { ...i, quantity }
              : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalUniqueItems: () => get().items.length,
    }),
    { name: "cart" },
  ),
);
