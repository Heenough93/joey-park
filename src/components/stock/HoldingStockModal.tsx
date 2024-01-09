import React from 'react';
import { Box, Button, Divider, Grid, Modal, Typography } from '@mui/material';

import { MarketType, Stock } from '../../interfaces';
import { useHoldingStockStore } from '../../stores';
import { useDialog } from '../../hooks';


interface Props {
  getHoldingStocks: (sequence?: number) => Promise<void>
}

const HoldingStockModal = (props: Props) => {
  //
  const { getHoldingStocks } = props;

  const { confirm, alert } = useDialog();

  const {
    selectedHoldingStock,
    setSelectedHoldingStock,
    holdingStockModalOpen: open,
    setHoldingStockModalOpen: setOpen,
  } = useHoldingStockStore();

  const [stocks, setStocks] = React.useState<Stock[]>([]);

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

  const style = React.useMemo(()  => {
    return {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  }, []);

  React.useEffect(() => {
    const getStocks = () => {
      fetch(process.env.REACT_APP_BASE_URL + 'stock/stocks', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => setStocks(res.data));
    }

    (getStocks)();
  }, []);

  React.useEffect(() => {
    if (selectedHoldingStock) {
      setStockCode(selectedHoldingStock.stockCode);
      setStockHoldings(selectedHoldingStock.stockHoldings);
      setBuyingDate(selectedHoldingStock.buyingDate);
      setBuyingPrice(selectedHoldingStock.buyingPrice);
      setTargetDate(selectedHoldingStock.targetDate);
      setTargetPrice(selectedHoldingStock.targetPrice);
      setCurrency(selectedHoldingStock.currency);
      setRateOfExchange(selectedHoldingStock.rateOfExchange);
      setMarketType(selectedHoldingStock.marketType);
      setStockFirmName(selectedHoldingStock.stockFirmName);
      setSource(selectedHoldingStock.source);
    } else {
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

      setOpen(false);
    }
  }, [selectedHoldingStock])

  const handleClose = React.useCallback(() => {
    setOpen(false)
  }, []);

  const handleClickRegister = React.useCallback(async () => {
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

  const handleClickModify = React.useCallback(async () => {
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

  const handleClickRemove = React.useCallback(async () => {
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Holding Stock Modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {`Stock Name : ${stocks.find((stock) => stock.code === selectedHoldingStock?.stockCode || '')?.name || ''}`}
        </Typography>
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <Button onClick={handleClickRegister}>Register</Button>
          <Button onClick={handleClickModify}>Modify</Button>
          <Button onClick={handleClickRemove}>Remove</Button>
        </div>
        <Divider />
        <div style={{height: 400, width: '100%'}}>
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
      </Box>
    </Modal>
  );
}

export default HoldingStockModal;
