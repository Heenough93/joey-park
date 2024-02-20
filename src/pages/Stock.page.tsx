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
  }, [ accessToken ]);

  return (
    <>
      <div style={{ backgroundColor: '#ffffff', position: 'fixed', zIndex: 50, width: '100%', height: '100px' }}>
        <div style={{ textAlign: 'center' }}>
            Stock Page
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={openDrawer( true)}>drawer</Button>
        </div>
        {accessToken && <Stock />}
      </div>
      <div style={{ height: '100px' }}></div>
    </>
  );
};

export default StockPage;