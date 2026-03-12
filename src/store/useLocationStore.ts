import { create } from "zustand";
import { setLocationCookies, confirmLocationCookie } from "@/lib/cookies";

interface LocationState {
  selectedId: string;
  isConfirmed: boolean;
  setSelectedId: (id: string) => void;
  confirmLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set) => ({
  selectedId: "tashkent-city",
  isConfirmed: false,
  setSelectedId: (id) => {
    set({ selectedId: id, isConfirmed: true });
    setLocationCookies(id);
  },
  confirmLocation: () => {
    set({ isConfirmed: true });
    confirmLocationCookie();
  },
}));
