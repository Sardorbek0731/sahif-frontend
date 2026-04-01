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
  users: User[];
  activeUserId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  addOrActivateUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
};

const MAX_USERS = 5;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: [],
      activeUserId: null,
      token: null,
      isAuthenticated: false,

      addOrActivateUser: (user) => {
        set((state) => {
          const exists = state.users.some((u) => u.phone === user.phone);
          const updatedUsers = exists
            ? state.users.map((u) => (u.phone === user.phone ? user : u))
            : [...state.users, user].slice(-MAX_USERS);
          return {
            users: updatedUsers,
            activeUserId: user.id,
            isAuthenticated: true,
          };
        });
      },

      setToken: (token) => {
        set({ token, isAuthenticated: true });
        const activeUserId = get().activeUserId;
        const user = get().users.find((u) => u.id === activeUserId);
        if (user) {
          const fullName = `${user.firstName} ${user.lastName}`.trim();
          setAuthCookies(token, fullName);
        }
      },

      logout: () => {
        set({ token: null, isAuthenticated: false, activeUserId: null });
        deleteCookie("auth-token");
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        users: state.users,
        activeUserId: state.activeUserId,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
