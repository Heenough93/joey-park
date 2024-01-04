import React from 'react';
import { createPortal } from 'react-dom';

import './Dialog.css';
import { useDialogStore } from '../../stores';
import { useDialog, useEnterEscButtons } from '../../hooks';


const Dialog = () => {
  //
  const dialogRoot = document.getElementById('dialog') as HTMLElement;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const {
    type,
    title,
    description,
    revealed,
  } = useDialogStore();
  
  const { onInteractionEnd } = useDialog();
  
  const handleClickOK = React.useCallback(() => {
    if (type === 'prompt') {
      onInteractionEnd(inputRef.current?.value || '');
      return;
    }

    onInteractionEnd(true);
  }, [inputRef.current, type, onInteractionEnd]);
  
  const handleClickCancel = React.useCallback(() => {
    if (type === 'prompt') {
      onInteractionEnd('');
      return;
    }

    onInteractionEnd(false);
  }, [type, onInteractionEnd]);

  useEnterEscButtons({ handleClickOK, handleClickCancel });

  const DialogComponent = React.memo(() => (
    <>
      {/*<div className='dialog-backdrop' onClick={handleClickCancel} />*/}
      <div className='dialog-backdrop' />

      <dialog className='dialog' open={revealed}>
        <h2 className='dialog__title'>{title}</h2>
        {description && (
          <p className='dialog__description'>{description}</p>
        )}
        {type === 'prompt' && (
          <form onSubmit={handleClickOK}>
            <input
              autoFocus
              type='text'
              className='dialog__input'
              ref={inputRef}
            />
          </form>
        )}
        <div className='dialog__buttons'>
          <button
            type='button'
            className='dialog__button dialog__button--confirm'
            onClick={handleClickOK}
          >
            OK
          </button>
          {type !== 'alert' && (
            <button
              type='button'
              className='dialog__button dialog__button--cancel'
              onClick={handleClickCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </dialog>
    </>
  ));

  return createPortal(revealed ? <DialogComponent /> : null, dialogRoot);
}

export default Dialog;