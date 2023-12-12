import React from 'react';
import { Button } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useSideBarStore } from '../stores';
import { VisitorGrid } from '../components';


const VisitorPage = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <>
      <div>
        Visitor Page
        <Button onClick={openDrawer( true)}>drawer</Button>
      </div>
      <VisitorGrid />
    </>
  )
}

export default VisitorPage