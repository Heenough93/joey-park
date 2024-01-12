import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useSideBarStore } from '../stores';
import { useDialog } from '../hooks';
import { Stock } from '../components';


const StockPage = () => {
  //
  const navigate = useNavigate();

  const { alert } = useDialog();

  const { openDrawer } = useSideBarStore();

  const accessToken = React.useMemo(() => {
    return sessionStorage.getItem('accessToken') || '';
  }, []);

  React.useEffect(() => {
    if (!accessToken) {
      alert('Access Token is empty.').then((ok) => {
        if (ok) {
          navigate('/auth');
        }
      });
    }
  }, [accessToken]);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        Stock Page
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={openDrawer( true)}>drawer</Button>
      </div>
      {accessToken && <Stock />}
    </>
  )
}

export default StockPage