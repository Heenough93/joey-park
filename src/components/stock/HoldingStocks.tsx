import React from 'react';
import { Button, Divider, Grid } from '@mui/material';

import { useDialog } from '../../hooks';
import { MarketType, HoldingStock } from '../../interfaces';


const HoldingStocks = () => {
  //
  const { confirm, alert } = useDialog();

  const [holdingStocks, setHoldingStocks] = React.useState<HoldingStock[]>([]);
  const [selectedHoldingStock, setSelectedHoldingStock] = React.useState<HoldingStock | null>(null);

  const [stockCode, setStockCode] = React.useState<string>('');
  const [stockHoldings, setStockHoldings] = React.useState<number>(0);
  const [buyingDate, setBuyingDate] = React.useState<Date>(new Date());
  const [buyingPrice, setBuyingPrice] = React.useState<number>(0);
  const [targetDate, setTargetDate] = React.useState<Date>(new Date());
  const [targetPrice, setTargetPrice] = React.useState<number>(0);
  const [currency, setCurrency] = React.useState<string>('');
  const [rateOfExchange, setRateOfExchange] = React.useState<string>('');
  const [marketType, setMarketType] = React.useState<MarketType>('domestic');
  const [stockFirmName, setStockFirmName] = React.useState<string>('');
  const [source, setSource] = React.useState<string>('');

  React.useEffect(() => {
    setStockCode(selectedHoldingStock ? selectedHoldingStock.stockCode : '');
    setStockHoldings(selectedHoldingStock ? selectedHoldingStock.stockHoldings : 0);
    setBuyingDate(selectedHoldingStock ? selectedHoldingStock.buyingDate : new Date());
    setBuyingPrice(selectedHoldingStock ? selectedHoldingStock.buyingPrice : 0);
    setTargetDate(selectedHoldingStock ? selectedHoldingStock.targetDate : new Date());
    setTargetPrice(selectedHoldingStock ? selectedHoldingStock.targetPrice : 0);
    setCurrency(selectedHoldingStock ? selectedHoldingStock.currency : '');
    setRateOfExchange(selectedHoldingStock ? selectedHoldingStock.rateOfExchange : '');
    setMarketType(selectedHoldingStock ? selectedHoldingStock.marketType : 'domestic');
    setStockFirmName(selectedHoldingStock ? selectedHoldingStock.stockFirmName : '');
    setSource(selectedHoldingStock ? selectedHoldingStock.source : '');
  }, [selectedHoldingStock])

  const handleChangeStockCode = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setStockCode(event.target.value);
  }, [])

  const handleChangeStockHoldings = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setStockHoldings(Number(event.target.value));
  }, [])

  const handleChangeBuyingDate = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyingDate(new Date(event.target.value));
  }, [])

  const handleChangeBuyingPrice = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyingPrice(Number(event.target.value));
  }, [])

  const handleChangeTargetDate = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDate(new Date(event.target.value));
  }, [])

  const handleChangeTargetPrice = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetPrice(Number(event.target.value));
  }, [])

  const handleChangeCurrency = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  }, [])

  const handleChangeRateOfExchange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRateOfExchange(event.target.value);
  }, [])

  const handleChangeMarketType = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMarketType(event.target.value as MarketType);
  }, [])

  const handleChangeStockFirmName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setStockFirmName(event.target.value);
  }, [])

  const handleChangeSource = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  }, [])

  const handleClickReset = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    setHoldingStocks([]);
    setSelectedHoldingStock(null);
    setStockCode('');
    setStockHoldings(0);
    setBuyingDate(new Date());
    setBuyingPrice(0);
    setTargetDate(new Date());
    setTargetPrice(0);
    setCurrency('');
    setRateOfExchange('');
    setMarketType('domestic');
    setStockFirmName('');
    setSource('');
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

    await getHoldingStocks(sequence);
  }, [getHoldingStocks])

  const handleClickHoldingStockRegister = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    await fetch(process.env.REACT_APP_BASE_URL + 'stock/create/holdingstock', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { stockCode, stockHoldings, buyingDate, buyingPrice, targetDate, targetPrice, currency, rateOfExchange, marketType, stockFirmName, source } })
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(JSON.parse(res.data).message);
        if (ok) {
          setSelectedHoldingStock(null);
          await getHoldingStocks();
        }
      })
  }, [stockCode, stockHoldings, buyingDate, buyingPrice, targetDate, targetPrice, currency, rateOfExchange, marketType, stockFirmName, source])

  const handleClickHoldingStockModify = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    if (!selectedHoldingStock) {
      await alert('You should select a holdingStock first.');
      return;
    }

    await fetch(process.env.REACT_APP_BASE_URL + 'stock/update/holdingstock', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { sequence: selectedHoldingStock.sequence, stockCode, stockHoldings, buyingDate, buyingPrice, targetDate, targetPrice, currency, rateOfExchange, marketType, stockFirmName, source } })
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(JSON.parse(res.data).message);
        if (ok) {
          setSelectedHoldingStock(null);
          await getHoldingStocks();
        }
      });
  }, [selectedHoldingStock, stockCode, stockHoldings, buyingDate, buyingPrice, targetDate, targetPrice, currency, rateOfExchange, marketType, stockFirmName, source])

  const handleClickHoldingStockRemove = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    if (!selectedHoldingStock) {
      await alert('You should select a holdingStock first.');
      return;
    }

    await fetch(process.env.REACT_APP_BASE_URL + 'stock/delete/holdingstock', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { sequence: selectedHoldingStock.sequence, stockCode, stockHoldings, buyingDate, buyingPrice, targetDate, targetPrice, currency, rateOfExchange, marketType, stockFirmName, source } })
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        const ok = await alert(JSON.parse(res.data).message);
        if (ok) {
          setSelectedHoldingStock(null);
          await getHoldingStocks();
        }
      });
  }, [selectedHoldingStock, stockCode, stockHoldings, buyingDate, buyingPrice, targetDate, targetPrice, currency, rateOfExchange, marketType, stockFirmName, source])

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div>
        <Button onClick={handleClickReset}>Reset</Button>
        <Button onClick={handleClickHoldingStockList}>HoldingStock List</Button>
        <Button onClick={handleClickHoldingStockRegister}>HoldingStock Register</Button>
        <Button onClick={handleClickHoldingStockModify}>HoldingStock Modify</Button>
        <Button onClick={handleClickHoldingStockRemove}>HoldingStock Remove</Button>
      </div>
      <Divider />
      <div style={{ height: 700 }}>
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
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          STOCK_CODE
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeStockCode} value={stockCode} />
        </Grid>
        <Grid item xs={6} md={4}>
          STOCK_HOLDINGS
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeStockHoldings} value={stockHoldings} />
        </Grid>
        <Grid item xs={6} md={4}>
          BUYING_DATE
        </Grid>
        <Grid item xs={6} md={8}>
          <input type={'date'} onChange={handleChangeBuyingDate} value={new Date(buyingDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('. ', '-').replaceAll('.', '')} />
        </Grid>
        <Grid item xs={6} md={4}>
          BUYING_PRICE
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeBuyingPrice} value={buyingPrice} />
        </Grid>
        <Grid item xs={6} md={4}>
          TARGET_DATE
        </Grid>
        <Grid item xs={6} md={8}>
          <input type={'date'} onChange={handleChangeTargetDate} value={new Date(targetDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('. ', '-').replaceAll('.', '')} />
        </Grid>
        <Grid item xs={6} md={4}>
          TARGET_PRICE
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeTargetPrice} value={targetPrice} />
        </Grid>
        <Grid item xs={6} md={4}>
          CURRENCY
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeCurrency} value={currency} />
        </Grid>
        <Grid item xs={6} md={4}>
          RATE_OF_EXCHANGE
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeRateOfExchange} value={rateOfExchange} />
        </Grid>
        <Grid item xs={6} md={4}>
          MARKET_TYPE
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeMarketType} value={marketType} />
        </Grid>
        <Grid item xs={6} md={4}>
          STOCK_FIRM_NAME
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeStockFirmName} value={stockFirmName} />
        </Grid>
        <Grid item xs={6} md={4}>
          SOURCE
        </Grid>
        <Grid item xs={6} md={8}>
          <input onChange={handleChangeSource} value={source} />
        </Grid>
      </Grid>
    </div>
  );
}

export default HoldingStocks;
