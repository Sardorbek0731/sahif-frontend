import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchState {
  history: string[];
  addToHistory: (query: string) => void;
  removeFromHistory: (query: string) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (query) =>
        set((state) => {
          const trimmed = query.trim();
          if (!trimmed) return state;
          const newHistory = [
            trimmed,
            ...state.history.filter((h) => h !== trimmed),
          ].slice(0, 5);
          return { history: newHistory };
        }),
      removeFromHistory: (query) =>
        set((state) => ({
          history: state.history.filter((h) => h !== query),
        })),
    }),
    { name: "search-history" },
  ),
);
