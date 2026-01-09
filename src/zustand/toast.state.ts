import { create } from "zustand";

export const useToast = create<ToastStore>((set) => ({
  show: false,
  message: "",
  type: "success",
  showToast: (msg, type) => set({ show: true, message: msg, type }),
  hideToast: () => set({ show: false, message: "", type: "success" }),
}));
