import React from 'react';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSideBarStore } from '../stores';
import { useDialog } from '../hooks';
import { CustomMap } from '../components';


const MyMapPage = () => {
  //
  const location = useLocation();

  const navigate = useNavigate();

  const { alert } = useDialog();

  const { openDrawer } = useSideBarStore();

  React.useEffect(() => {
    if (!location.state?.accessToken) {
      alert('Access Token is empty.').then((ok) => {
        if (ok) {
          navigate('/auth');
        }
      });
    }
  }, [location]);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        Map Page
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={openDrawer( true)}>drawer</Button>
      </div>
      {location.state?.accessToken && <CustomMap isVisitor={false} />}
    </>
  )
}

export default MyMapPage