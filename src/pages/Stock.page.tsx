import React from 'react';
import { Button } from '@mui/material';

import { useSideBarStore } from '../stores';
import { StockTable } from '../components';


const StockPage = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        Stock Page
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={openDrawer( true)}>drawer</Button>
      </div>
      <StockTable />
    </>
  )
}

export default StockPage