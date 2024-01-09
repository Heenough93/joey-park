import { create } from 'zustand'
import { HoldingStock } from '../interfaces';


export interface HoldingStockStore {
  selectedHoldingStock: HoldingStock | null,
  setSelectedHoldingStock: (selectedHoldingStock: HoldingStock | null) => void,
  holdingStockModalOpen: boolean,
  setHoldingStockModalOpen: (holdingStockModalOpen: boolean) => void,
}

const useHoldingStockStore = create<HoldingStockStore>((set) => ({
  selectedHoldingStock: null,
  setSelectedHoldingStock: (selectedHoldingStock) => {
    set((prev) => ({ ...prev, selectedHoldingStock }))
  },
  holdingStockModalOpen: false,
  setHoldingStockModalOpen: (holdingStockModalOpen) => {
    set((prev) => ({ ...prev, holdingStockModalOpen }))
  },
}));

export default useHoldingStockStore;
