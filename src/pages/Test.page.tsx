import React from 'react';
import { Button } from '@mui/material';

import { useSideBarStore } from '../stores';
import { Test } from '../components';


const TestPage = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <>
      <div>
        Test Page
        <Button onClick={openDrawer( true)}>drawer</Button>
      </div>
      <Test />
    </>
  )
}

export default TestPage