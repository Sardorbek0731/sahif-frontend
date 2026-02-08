import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationState {
  selectedId: string;
  isConfirmed: boolean;
  setSelectedId: (id: string) => void;
  confirmLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedId: "tashkent-city",
      isConfirmed: false,
      setSelectedId: (id) => set({ selectedId: id, isConfirmed: true }),
      confirmLocation: () => set({ isConfirmed: true }),
    }),
    {
      name: "location-storage",
    },
  ),
);
