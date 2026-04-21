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
          // Phone bo'yicha mavjud user'ni topish
          const existingUserIndex = state.users.findIndex(
            (u) => u.phone === user.phone,
          );

          if (existingUserIndex !== -1) {
            // Mavjud user - ma'lumotlarni yangilash (ID o'zgarmasligi kerak)
            const existingUser = state.users[existingUserIndex];
            const updatedUsers = state.users.map((u, index) =>
              index === existingUserIndex
                ? {
                    ...existingUser, // Eski ma'lumotlar (ID saqlanadi)
                    ...user, // Yangi ma'lumotlar
                    id: existingUser.id, // ID o'zgarmasligi kerak!
                  }
                : u,
            );
            return {
              users: updatedUsers,
              activeUserId: existingUser.id, // Eski ID ishlatish
              isAuthenticated: true,
            };
          } else {
            // Yangi user - oxiriga qo'shish va max 5 ta saqlash
            const updatedUsers = [...state.users, user].slice(-MAX_USERS);
            return {
              users: updatedUsers,
              activeUserId: user.id,
              isAuthenticated: true,
            };
          }
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
