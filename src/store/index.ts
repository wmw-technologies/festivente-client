import { create } from 'zustand';

type State = {
  isCollapsed: boolean;
};

type Action = {
  toggleMenu: () => void;
};

const useStore = create<State & Action>((set) => ({
  isCollapsed: false,
  toggleMenu: () => set((state) => ({ isCollapsed: !state.isCollapsed }))
}));

export { useStore };
