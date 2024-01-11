import React from 'react';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSideBarStore } from '../stores';
import { useDialog } from '../hooks';
import { Stock } from '../components';


const StockPage = () => {
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
        Stock Page
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={openDrawer( true)}>drawer</Button>
      </div>
      {location.state?.accessToken && <Stock />}
    </>
  )
}

export default StockPage