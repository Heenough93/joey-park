import { create } from 'zustand'


export type DialogType = 'alert' | 'confirm' | 'prompt';
export type ResponseHandler<T> = (value: T | PromiseLike<T>) => void;

export interface DialogStore {
  type: DialogType;
  setType: (state: DialogType) => void;
  title: string;
  setTitle: (text: string) => void;
  description: string;
  setDescription: (description: string) => void;
  revealed: boolean;
  setRevealed: (show: boolean) => void;
  responseHandler?: ResponseHandler<string | boolean>;
  setResponseHandler: (responseHandler: ResponseHandler<string | boolean>) => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  type: 'alert',
  setType: (type) => {
    set((prev) => ({ ...prev, type }));
  },
  title: '',
  setTitle: (title) => {
    set((prev) => ({ ...prev, title }));
  },
  description: '',
  setDescription: (description) => {
    set((prev) => ({ ...prev, description }));
  },
  revealed: false,
  setRevealed(revealed) {
    set((prev) => ({ ...prev, revealed }));
  },
  setResponseHandler(responseHandler) {
    set((prev) => ({ ...prev, responseHandler }));
  },
}));

export default useDialogStore;
