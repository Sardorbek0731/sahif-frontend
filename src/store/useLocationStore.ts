import { create } from "zustand";
import { setLocationCookies, confirmLocationCookie } from "@/lib/cookies";
import { DEFAULT_LOCATION_ID } from "@/constants";

interface LocationState {
  selectedId: string;
  isConfirmed: boolean;
  setSelectedId: (id: string) => void;
  confirmLocation: () => void;
  initialize: (locationId: string, confirmed: boolean) => void;
}

export const useLocationStore = create<LocationState>()((set) => ({
  selectedId: DEFAULT_LOCATION_ID,
  isConfirmed: false,
  setSelectedId: (id) => {
    set({ selectedId: id, isConfirmed: true });
    setLocationCookies(id);
  },
  confirmLocation: () => {
    set({ isConfirmed: true });
    confirmLocationCookie();
  },
  initialize: (locationId, confirmed) =>
    set({ selectedId: locationId, isConfirmed: confirmed }),
}));
