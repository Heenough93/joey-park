import React from 'react';
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { HoldingStockRdo, Stock } from '../../interfaces';
import { useDialog } from '../../hooks';


interface Column {
  key: string,
  value: string,
  check: boolean,
  disabled?: boolean,
  formatFnc?: (holdingStockRdo: HoldingStockRdo, key: string) => string,
}

interface Data {
  [p: string]: string[],
}

const StockTable = () => {
  //
  const { confirm, alert } = useDialog();

  const [accessToken, setAccessToken] = React.useState<string>('');

  React.useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken') || '';
    setAccessToken(accessToken);
  }, [])

  const getHoldingStockRdos = async () => {
    setIsLoading(true);

    const stockCodes = await fetch(process.env.REACT_APP_BASE_URL + '/stock/stocks', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => res.data.map((stock: Stock) => stock.code));

    await fetch(process.env.REACT_APP_BASE_URL + '/stock/holdingstockrdos', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: stockCodes })
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setHoldingStockRdos(res.data)
      });
  }

  const formatStockCode = (holdingStockRdo: HoldingStockRdo, targetKey: string): string => {
    const stockCode: string = Object.values(holdingStockRdo)[Object.keys(holdingStockRdo).findIndex(key => key === targetKey)];
    const stockName: string = holdingStockRdo.stockName;
    return stockName + '\n(' + stockCode + ')';
  }

  const formatStockHoldings = (holdingStockRdo: HoldingStockRdo, targetKey: string): string => {
    const stockHoldings: number = Object.values(holdingStockRdo)[Object.keys(holdingStockRdo).findIndex(key => key === targetKey)];
    return stockHoldings.toString() + ' 주';
  }

  const formatDate = (holdingStockRdo: HoldingStockRdo, targetKey: string): string => {
    const date: Date = Object.values(holdingStockRdo)[Object.keys(holdingStockRdo).findIndex(key => key === targetKey)];
    return new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('. ', '-').replaceAll('.', '');
  };

  const formatAmount = (holdingStockRdo: HoldingStockRdo, targetKey: string): string => {
    const amount: number = Object.values(holdingStockRdo)[Object.keys(holdingStockRdo).findIndex(key => key === targetKey)];
    const currency: string = holdingStockRdo.currency;
    if (currency === 'USD') {
      return amount.toLocaleString('en-US', {maximumFractionDigits: 2}) + ' 달러';
      // return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD' }); // + ' 달러';
    } else {
      return amount.toLocaleString('ko-KR') + ' 원';
      // return amount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }); // + ' 원';
    }
  };

  const [columns, setColumns] = React.useState<Column[]>(
    [
      // {key: 'stockName', value: '종목명', check: true, disabled: true},
      {key: 'stockCode', value: '종목코드', check: true, disabled: true, formatFnc: formatStockCode},
      {key: 'stockFirmName', value: '증권사명', check: false},
      {key: 'stockHoldings', value: '보유수량', check: false, formatFnc: formatStockHoldings},
      {key: 'buyingDate', value: '매수일', check: false, formatFnc: formatDate},
      {key: 'buyingPrice', value: '매수단가', check: false, formatFnc: formatAmount},
      {key: 'targetDate', value: '목표일', check: false, formatFnc: formatDate},
      {key: 'targetPrice', value: '목표가', check: false, formatFnc: formatAmount},
      {key: 'currentDate', value: '현재일', check: false, formatFnc: formatDate},
      {key: 'currentPrice', value: '현재가', check: false, formatFnc: formatAmount},
      // {key: 'previousDate', value: '전일', check: false, formatFnc: formatDate},
      // {key: 'previousClosePrice', value: '전일종가', check: false, formatFnc: formatAmount},
      {key: 'buyingAmount', value: '매수금액', check: false, formatFnc: formatAmount},
      {key: 'currentAmount', value: '현재평가금액', check: false, formatFnc: formatAmount},
      // {key: 'previousAmount', value: '전일평가금액', check: false, formatFnc: formatAmount},
      {key: 'targetAmount', value: '목표평가금액', check: false, formatFnc: formatAmount},
      {key: 'currentProfitAndLoss', value: '현재평가손익', check: false, formatFnc: formatAmount},
      // {key: 'previousProfitAndLoss', value: '전일평가손익', check: false, formatFnc: formatAmount},
      {key: 'targetProfitAndLoss', value: '목표평가손익', check: false, formatFnc: formatAmount},
      {key: 'currentRateOfReturn', value: '현재수익률', check: false},
      // {key: 'previousRateOfReturn', value: '전일수익률', check: false},
      {key: 'targetRateOfReturn', value: '목표수익률', check: false},
      // {key: 'currency', value: '통화', check: false},
      // {key: 'rateOfExchange', value: '환율', check: false},
      // {key: 'marketType', value: '시장타입', check: false},
      {key: 'source', value: '자금 출처', check: false},
    ]
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [holdingStockRdos, setHoldingStockRdos] = React.useState<HoldingStockRdo[]>([]);
  const [data, setData] = React.useState<Data | null>(null);

  React.useEffect(() => {
    const startInterval = (callback: () => void, seconds: number) => {
      callback();
      return setInterval(callback, seconds * 1000);
    };

    startInterval((getHoldingStockRdos), 60 * 10);
  }, [])

  React.useEffect(() => {
    const newData: Data = {};
    columns.map(v => {
      Object.assign(newData, { [v.key + 's']: [] as string[] })
      holdingStockRdos.map((rdo) => newData[v.key + 's'].push(v.formatFnc ? v.formatFnc(rdo, v.key) : Object.values(rdo)[Object.keys(rdo).findIndex(key => key === v.key)]));
      return v;
    })
    setData(newData);
  }, [holdingStockRdos]);

  const handleClickBatch = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    setIsLoading(true);

    const stockCodes = await fetch(process.env.REACT_APP_BASE_URL + '/stock/stocks', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => res.data.map((stock: Stock) => {
        if (stock.marketType === 'domestic') {
          return stock.code + '.XKRX';
        } else {
          return stock.code;
        }
      }));

    await fetch(process.env.REACT_APP_BASE_URL + '/stocks/execute-batch', {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
      body: JSON.stringify({ symbols: stockCodes }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log({ res });
        setIsLoading(false);
        const ok = await alert(res.message);
        if (ok) {
          await getHoldingStockRdos();
        }
      });
  }, [accessToken])

  const onClickCheckbox = (targetKey: string) => {
    const newColumns = columns.map((column) => {
      if (column.key === targetKey) {
        return { ...column, check: !column.check };
      } else {
        return { ...column };
      }
    });
    setColumns(newColumns);
  }

  const callbackFnc = (previousValue: number[], currentValue: string, currentIndex: number, array: string[]) => {
    if (currentIndex === 0) {
      previousValue.push(1);
      return previousValue;
    } else {
      if (array[currentIndex - 1] === currentValue) {
        previousValue[array.indexOf(currentValue)]++;
        previousValue.push(0);
        return previousValue;
      } else {
        previousValue.push(1);
        return previousValue;
      }
    }
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      {isLoading && <>
        <Backdrop
          style={{color: '#fff', zIndex: 1000}}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>}

      <div>
        <Button onClick={handleClickBatch}>Batch</Button>
      </div>

      <FormGroup row>
        {columns.map(({key, value, check, disabled}, index) => {
          return (
            <FormControlLabel control={<Checkbox key={index} checked={check} disabled={disabled} onClick={() => onClickCheckbox(key)} />} label={value} />
          )
        })}
      </FormGroup>

      <TableContainer style={{
        width: '100%',
        maxHeight: 600,
        overflowX: 'auto',
      }}>
        <Table stickyHeader style={{minWidth: 650}}>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <>{column.check && <TableCell key={column.key}>{column.value}</TableCell>}</>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.stockCodes.map((stockCode, index) => {
              return (
                <TableRow key={index}>
                  {columns.map((column) => {
                    if (column.disabled) {
                      const counts = data[column.key + 's'].reduce(callbackFnc, [] as number[]);
                      return (
                        <>
                          {column.check && counts[index] !== 0 && <TableCell rowSpan={counts[index]}>
                            {data[column.key + 's'][index].split('\n').map(i => <div>{i}</div>)}
                          </TableCell>}
                        </>
                      )
                    } else {
                      return (
                        <>
                          {column.check && <TableCell>
                            {data[column.key + 's'][index].split('\n').map(i => <div style={{color: i.charAt(0) === '-' ? 'red' : 'black'}}>{i}</div>)}
                          </TableCell>}
                        </>
                      )
                    }
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StockTable;
