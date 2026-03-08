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
      setSelectedId: (id) => {
        set({ selectedId: id, isConfirmed: true });
        document.cookie = `location-id=${id}; path=/; max-age=31536000; SameSite=Lax`;
        document.cookie = `location-confirmed=true; path=/; max-age=31536000; SameSite=Lax`;
      },
      confirmLocation: () => {
        set({ isConfirmed: true });
        document.cookie = `location-confirmed=true; path=/; max-age=31536000; SameSite=Lax`;
      },
    }),
    { name: "location-storage" },
  ),
);
