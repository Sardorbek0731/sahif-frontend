import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setAuthCookies, deleteCookie } from "@/lib/cookies";

type User = {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user) => {
        set({ user, isAuthenticated: true });
        const token = get().token;
        if (token) {
          const fullName = `${user.firstName} ${user.lastName}`.trim();
          setAuthCookies(token, fullName);
        }
      },

      setToken: (token) => {
        set({ token });
      },

      logout: () => {
        set({ token: null, isAuthenticated: false });
        deleteCookie("auth-token");
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
