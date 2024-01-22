import React from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


type State = {
  open: boolean,
};

type Action = {
  setOpen: (open: State['open']) => void,
  openDrawer: (open: State['open']) => (event: React.KeyboardEvent | React.MouseEvent) => void,
};

const useSideBarStore = create<State & Action>((set) => ({
  open: false,
  setOpen: (open) => set((state) => ({ open: open })),
  openDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    set((state) => ({ open: open }));
  },
}));

// const useSideBarStore = create<State & Action>()(
//   persist(
//     (set, get) => ({
//       open: false,
//       updateOpen: (open) => set((state) => ({ open: open })),
//     }),
//     {
//       name: 'open-storage', // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//     }
//   )
// )

export default useSideBarStore;
