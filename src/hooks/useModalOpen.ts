import React from 'react';


export const useModalOpen = () => {
  //
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    setOpen,
    handleClose,
  }
};