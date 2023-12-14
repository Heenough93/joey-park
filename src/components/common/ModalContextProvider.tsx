import React from 'react';
import {
  Box,
  Modal,
  Button,
  Typography,
  TextField, Divider,
} from '@mui/material';

import { ModalContext, useModalOpen } from '../../hooks';
import { ModalContent } from '../../hooks/useModalContext';


interface Props {
  children: React.ReactNode
}

const ModalContextProvider = ({ children }: Props) => {
  //
  const { open, setOpen, handleClose } = useModalOpen();

  const [content, setContent] = React.useState<ModalContent | null>(null);
  const [text, setText] = React.useState<string>('');

  React.useEffect(() => {
    if (!open) {
      setContent(null);
      setText('');
    }
  }, [open])

  const setModalContent = React.useCallback((modalContent: ModalContent) => {
    setOpen(true);
    setContent(modalContent);
  }, []);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleOk = React.useCallback(() => {
    content?.callbackFnc(text);
    handleClose();
  }, []);

  const handleCancel = React.useCallback(() => {
    handleClose();
  }, []);

  const style = React.useMemo(()  => {
    return {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '30%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  }, []);

  return (
    <ModalContext.Provider value={{ setModalContent }}>
      {children}

      {content &&
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {content.type === 'alert' && <>
              {/*<Typography id="modal-modal-title" variant="h6" component="h2">*/}
              {/*  {content.title}*/}
              {/*</Typography>*/}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {content.title}
              </Typography>
              <Divider />
              {content.message}
            </>}

            {content.type === 'confirm' && <>
              {/*<Typography id="modal-modal-title" variant="h6" component="h2">*/}
              {/*  {content.title}*/}
              {/*</Typography>*/}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {content.title}
              </Typography>
              <Divider />
              {content.message}
            </>}

            {content.type === 'prompt' && <>
              {/*<Typography id="modal-modal-title" variant="h6" component="h2">*/}
              {/*  {content.title}*/}
              {/*</Typography>*/}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {content.title}
              </Typography>
              <Divider />
              {content.message}
              <input value={text} onChange={handleChange} />
            </>}

            <div style={{ marginBottom: '10px', marginTop: '10px' }}>
              <Button
                style={{ marginLeft: '3px', marginRight: '3px', backgroundColor: '#E8B09F' }}
                variant='contained'
                size='small'
                onClick={handleOk}
              >
                Confirm
              </Button>
              <Button
                style={{ marginLeft: '3px', marginRight: '3px', backgroundColor: '#E8B09F' }}
                variant='contained'
                size='small'
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>

            {/*<div style={{height: 50, width: '100%'}}>*/}
            {/*  content*/}
            {/*</div>*/}
          </Box>
        </Modal>
      }
    </ModalContext.Provider>
  )
};

export default ModalContextProvider;