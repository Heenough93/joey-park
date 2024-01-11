import React from 'react';
import { Button } from '@mui/material';

import { useSideBarStore } from '../stores';
import { Auth } from '../components';


const AuthPage = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        Auth Page
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={openDrawer( true)}>drawer</Button>
      </div>
      <Auth />
    </>
  )
}

export default AuthPage