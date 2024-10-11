import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  isCollapsed: boolean;
};

type Action = {
  toggleMenu: () => void;
};

const useStore = create(
  persist<State & Action>(
    (set) => ({
      isCollapsed: false,
      toggleMenu: () => set((state) => ({ isCollapsed: !state.isCollapsed }))
    }),
    {
      name: 'menu-storage'
    }
  )
);

export { useStore };
