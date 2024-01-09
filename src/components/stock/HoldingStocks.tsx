import React from 'react';
import { Button, Divider, Grid } from '@mui/material';

import { useDialog } from '../../hooks';
import { HoldingStock } from '../../interfaces';
import { useHoldingStockStore } from '../../stores';
import HoldingStockModal from './HoldingStockModal';


const HoldingStocks = () => {
  //
  const { confirm, alert } = useDialog();

  const {
    setSelectedHoldingStock,
    setHoldingStockModalOpen,
  } = useHoldingStockStore();

  const [holdingStocks, setHoldingStocks] = React.useState<HoldingStock[]>([]);

  const handleClickReset = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    setHoldingStocks([]);
    setSelectedHoldingStock(null);
  }, [])

  const getHoldingStocks = React.useCallback(async (sequence?: number) => {
    await fetch(process.env.REACT_APP_BASE_URL + 'stock/holdingstocks', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        sequence ? setSelectedHoldingStock(res.data.find((holdingStock: HoldingStock) => holdingStock.sequence === sequence)) : setHoldingStocks(res.data);
      });
  }, [])

  const handleClickHoldingStockList = React.useCallback(async () => {
    await getHoldingStocks();
  }, [getHoldingStocks]);

  const handleClickHoldingStock = React.useCallback(async (sequence: number) => {
    if (!sequence) {
      await alert('code is empty.');
      return;
    }

    await getHoldingStocks(sequence)
      .then(() => setHoldingStockModalOpen(true));
  }, [getHoldingStocks])

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div>
        <Button onClick={handleClickReset}>Reset</Button>
        <Button onClick={handleClickHoldingStockList}>HoldingStock List</Button>
      </div>
      <Divider />
      <div>
        {holdingStocks.map((holdingStock, index) => {
          return (
            <div key={index} onClick={() => handleClickHoldingStock(holdingStock.sequence)}>
              {`STOCK_CODE: ${holdingStock.stockCode} / STOCK_HOLDINGS: ${holdingStock.stockHoldings} / BUYING_DATE: ${holdingStock.buyingDate} / BUYING_PRICE: ${holdingStock.buyingPrice} 
              / TARGET_DATE: ${holdingStock.targetDate} / TARGET_PRICE: ${holdingStock.targetPrice} / CURRENCY: ${holdingStock.currency} / RATE_OF_EXCHANGE: ${holdingStock.rateOfExchange} 
              / MARKET_TYPE: ${holdingStock.marketType} / STOCK_FIRM_NAME: ${holdingStock.stockFirmName} / SOURCE: ${holdingStock.source}`}
            </div>
          )
        })}
      </div>

      <HoldingStockModal
        getHoldingStocks={getHoldingStocks}
      />
    </div>
  );
}

export default HoldingStocks;
