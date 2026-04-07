import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      activeSubscription: null,
      token: "",
      isLoggedIn: false,
      acceptCookies: false,
      setToken: (token) => set({ token }),
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      setAcceptCookies: (accept) => set({ acceptCookies: accept }),
      setUser: (user) => set({ user }), // 👈 add this below setIsLoggedIn
      setActiveSubscription: (activeSubscription) =>
        set({ activeSubscription }), // 👈 add this below setIsLoggedIn
      reset: () =>
        set({
          user: null,
          activeSubscription: null,
          token: "",
          isLoggedIn: false,
        }),
    }),
    {
      name: "user-state",
    }
  )
);
