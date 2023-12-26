import React from 'react';

export interface ModalContent {
  type: 'alert' | 'confirm' | 'prompt',
  title: string,
  message: string | React.ReactElement | null,
  callbackFnc: (text: string) => void,
}

type ModalContextType = {
  setModalContent: (modalContent: ModalContent) => void,
};

export const ModalContext = React.createContext<ModalContextType>({} as ModalContextType);

export const useModalContext = (): ModalContextType => React.useContext(ModalContext);