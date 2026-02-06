import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationState {
  selectedId: string;
  setSelectedId: (id: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedId: "tashkent-city",

      setSelectedId: (id) => set({ selectedId: id }),
    }),
    {
      name: "location-storage",
    },
  ),
);
