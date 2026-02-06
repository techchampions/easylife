import { create } from "zustand";

export const useModal = create<ModalState>((set) => ({
  isCloseable: true,
  isOpen: false,
  content: null,
  open: (content) => set({ isOpen: true, content }),
  openStrong: (content) => set({ isOpen: true, isCloseable: false, content }),
  close: () => set({ isOpen: false, isCloseable: true, content: null }),
}));
