import React from 'react';
import { Button } from '@mui/material';

import { useSideBarStore } from '../stores';
import { CustomMap } from '../components';


const MapPage = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        Map Page
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={openDrawer( true)}>drawer</Button>
      </div>
      <CustomMap isVisitor={true} />
    </>
  );
};

export default MapPage;