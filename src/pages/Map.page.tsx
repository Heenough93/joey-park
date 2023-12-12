import React from 'react';
import { Button } from '@mui/material';

import { useSideBarStore } from '../stores';
import { CustomMap } from '../components';


const MapPage = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <>
      <div>
        Map Page
        <Button onClick={openDrawer( true)}>drawer</Button>
      </div>
      <CustomMap />
    </>
  )
}

export default MapPage