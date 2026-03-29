import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setCookie } from "@/lib/cookies";

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
        const currentToken = get().token;
        if (currentToken) {
          const fullName = `${user.firstName} ${user.lastName}`.trim();
          setCookie("auth-token", currentToken);
          setCookie("user-name", encodeURIComponent(fullName));
        }
      },

      setToken: (token) => {
        set({ token });
        setCookie("auth-token", token);
        const currentUser = get().user;
        if (currentUser) {
          const fullName =
            `${currentUser.firstName} ${currentUser.lastName}`.trim();
          setCookie("user-name", encodeURIComponent(fullName));
        }
      },

      logout: () => {
        set({ token: null, isAuthenticated: false }); 
        document.cookie = "auth-token=; path=/; max-age=0";
        document.cookie = "user-name=; path=/; max-age=0";
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
