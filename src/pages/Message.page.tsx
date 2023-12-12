import React from 'react';
import { Button } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useSideBarStore } from '../stores';
import { MessageGrid } from '../components';


const MessagePage = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        Message Page
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={openDrawer( true)}>drawer</Button>
      </div>
      <MessageGrid />
    </>
  )
}

export default MessagePage