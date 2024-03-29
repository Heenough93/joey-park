import React from 'react';
import { Button, Divider, Grid } from '@mui/material';

import { useDialog } from '../../hooks';
import { MarketType, ScrapedStockInfo, Stock } from '../../interfaces';


const Stocks = () => {
  //
  const { confirm, alert } = useDialog();

  const [ stocks, setStocks ] = React.useState<Stock[]>([]);
  const [ selectedStock, setSelectedStock ] = React.useState<Stock | null>(null);
  const [ scrapedStockInfos, setScrapedStockInfos ] = React.useState<ScrapedStockInfo[]>([]);

  const [ code, setCode ] = React.useState<string>('');
  const [ name, setName ] = React.useState<string>('');
  const [ symbol, setSymbol ] = React.useState<string>('');
  const [ marketType, setMarketType ] = React.useState<MarketType>('domestic');

  React.useEffect(() => {
    setCode(selectedStock ? selectedStock.code : '');
    setName(selectedStock ? selectedStock.name : '');
    setSymbol(selectedStock ? selectedStock.symbol : '');
    setMarketType(selectedStock ? selectedStock.marketType : 'domestic');
  }, [ selectedStock ]);

  const handleChangeCode = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  }, []);

  const handleChangeName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleChangeSymbol = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  }, []);

  const handleChangeMarketType = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMarketType(event.target.value as MarketType);
  }, []);

  const handleClickReset = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    setStocks([]);
    setSelectedStock(null);
    setScrapedStockInfos([]);
    setCode('');
    setName('');
    setSymbol('');
    setMarketType('domestic');
  }, []);

  const getStocks = React.useCallback(async (code?: string) => {
    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/stock/stocks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        code ? setSelectedStock(res.data.find((stock: Stock) => stock.code === code)) : setStocks(res.data);
        setScrapedStockInfos([]);
      });
  }, []);

  const handleClickStockList = React.useCallback(async () => {
    await getStocks();
  }, [ getStocks ]);

  const handleClickStock = React.useCallback(async (code: string) => {
    if (!code) {
      await alert('code is empty.');
      return;
    }

    await getStocks(code);
  }, [ getStocks ]);

  const handleClickStockRegister = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/stock/create/stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { code, name, symbol, marketType } }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(JSON.parse(res.data).message);
        if (ok) {
          setSelectedStock(null);
          await getStocks();
        }
      });
  }, [ code, name, symbol, marketType ]);

  const handleClickStockModify = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    if (!selectedStock) {
      await alert('You should select a stock first.');
      return;
    }

    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/stock/update/stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { code: selectedStock.code, name, symbol, marketType } }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(JSON.parse(res.data).message);
        if (ok) {
          setSelectedStock(null);
          await getStocks();
        }
      });
  }, [ selectedStock, code, name, symbol, marketType ]);

  const handleClickStockRemove = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    if (!selectedStock) {
      await alert('You should select a stock first.');
      return;
    }

    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/stock/delete/stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { code: selectedStock.code, name, symbol, marketType } }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(JSON.parse(res.data).message);
        if (ok) {
          setSelectedStock(null);
          await getStocks();
        }
      });
  }, [ selectedStock ]);

  const handleClickScrapedStockList = React.useCallback(async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL || ''}/stock/scrapedstockinfos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        setScrapedStockInfos(res.data);
        setStocks([]);
        setSelectedStock(null);
      });
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div>
        <Button onClick={handleClickReset}>Reset</Button>
        <Button onClick={handleClickStockList}>Stock List</Button>
        <Button onClick={handleClickStockRegister}>Stock Register</Button>
        <Button onClick={handleClickStockModify}>Stock Modify</Button>
        <Button onClick={handleClickStockRemove}>Stock Remove</Button>
      </div>
      <div>
        <Button onClick={handleClickScrapedStockList}>Scraped Stock List</Button>
      </div>
      <Divider />
      {!!stocks.length && <>
        <div style={{ height: 300, overflowY: 'auto' }}>
          {stocks.map((stock, index) => {
            return (
              <div key={index} onClick={() => handleClickStock(stock.code)}>
                {`CODE: ${stock.code} / NAME: ${stock.name} / SYMBOL: ${stock.symbol} / MARKET_TYPE: ${stock.marketType}`}
              </div>
            );
          })}
        </div>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            CODE
          </Grid>
          <Grid item xs={6} md={8}>
            <input onChange={handleChangeCode} value={code} />
          </Grid>
          <Grid item xs={6} md={4}>
            NAME
          </Grid>
          <Grid item xs={6} md={8}>
            <input onChange={handleChangeName} value={name} />
          </Grid>
          <Grid item xs={6} md={4}>
            SYMBOL
          </Grid>
          <Grid item xs={6} md={8}>
            <input onChange={handleChangeSymbol} value={symbol} />
          </Grid>
          <Grid item xs={6} md={4}>
            MARKET_TYPE
          </Grid>
          <Grid item xs={6} md={8}>
            <input onChange={handleChangeMarketType} value={marketType} />
          </Grid>
        </Grid>
      </>}

      {!!scrapedStockInfos.length && <>
        <div style={{ height: 300, overflowY: 'auto' }}>
          {scrapedStockInfos.map((scrapedStockInfo, index) => {
            return (
              <div key={index}>
                {`NAME: ${scrapedStockInfo.stockName} / CURRENT: ${new Date(scrapedStockInfo.currentDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('. ', '-').replaceAll('.', '')} (${scrapedStockInfo.currentPrice}) / PREVIOUS: ${new Date(scrapedStockInfo.previousDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('. ', '-').replaceAll('.', '')} (${scrapedStockInfo.previousClosePrice})`}
              </div>
            );
          })}
        </div>
        <Divider />
      </>}
    </div>
  );
};

export default Stocks;
