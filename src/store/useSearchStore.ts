import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SearchState {
  history: string[];
  addToHistory: (query: string) => void;
  removeFromHistory: (query: string) => void;
  clearHistory: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (query) =>
        set((state) => {
          const trimmed = query.trim();
          if (!trimmed) return state;
          const currentHistory = Array.isArray(state.history)
            ? state.history
            : [];
          const newHistory = [
            trimmed,
            ...currentHistory.filter((h) => h !== trimmed),
          ].slice(0, 5);
          return { history: newHistory };
        }),
      removeFromHistory: (query) =>
        set((state) => ({
          history: state.history.filter((h) => h !== query),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "search-history",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
