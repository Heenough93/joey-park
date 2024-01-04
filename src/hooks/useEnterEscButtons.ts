import React from 'react';


interface Props {
  handleClickOK: Function;
  handleClickCancel: Function;
}

export const useEnterEscButtons = ({ handleClickOK, handleClickCancel }: Props) => {
  //
  React.useEffect(() => {
    const listener = (event: { code: string; preventDefault: () => void }) => {
      if ((event.code === 'Enter' || event.code === 'NumpadEnter') ) {
        handleClickOK();
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [handleClickOK]);

  React.useEffect(() => {
    const listener = (event: { code: string; preventDefault: () => void }) => {
      if (event.code === 'Escape' ) {
        handleClickCancel();
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [handleClickCancel]);
};