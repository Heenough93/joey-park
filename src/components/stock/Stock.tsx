import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Stock = () => {
  //
  const navigate = useNavigate();

  const handleClickStockTable = React.useCallback(() => {
    navigate('stock-table')
  }, [navigate])

  const handleClickStocks = React.useCallback(() => {
    navigate('stocks')
  }, [navigate])

  const handleClickHoldingStocks = React.useCallback(() => {
    navigate('holding-stocks')
  }, [navigate])

  return (
    <div style={{ textAlign: 'center' }}>
      <Button onClick={handleClickStockTable}>StockTable</Button>
      <Button onClick={handleClickStocks}>Stocks</Button>
      <Button onClick={handleClickHoldingStocks}>HoldingStocks</Button>
    </div>
  );
}

export default Stock;
