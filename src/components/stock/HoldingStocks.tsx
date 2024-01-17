import React from 'react';
import { Button, Divider } from '@mui/material';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useDialog } from '../../hooks';
import { HoldingStock, Stock } from '../../interfaces';
import { useHoldingStockStore } from '../../stores';
import HoldingStockModal from './HoldingStockModal';


const HoldingStocks = () => {
  //
  const { confirm, alert } = useDialog();

  const {
    setSelectedHoldingStock,
    setHoldingStockModalOpen,
  } = useHoldingStockStore();

  const [stocks, setStocks] = React.useState<Stock[]>([]);
  const [holdingStocks, setHoldingStocks] = React.useState<HoldingStock[]>([]);

  React.useEffect(() => {
    const getStocks = () => {
      fetch(process.env.REACT_APP_BASE_URL + '/stock/stocks', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => setStocks(res.data));
    }

    (getStocks)();
  }, []);

  const defaultColDef: ColDef = React.useMemo(() => {
    return {
      editable: false,
      filter: false,
      sortable: true,
    }
  }, []);

  const columnDefs: ColDef<HoldingStock>[] = React.useMemo(() => {
    return [
      { headerName: 'No.', valueGetter: (params) => typeof params.node?.rowIndex === 'number' ? params.node?.rowIndex + 1 : 0, flex: 1 },
      { headerName: 'StockName', valueGetter: (params) => stocks.find((stock) => stock.code === params.data?.stockCode || '')?.name || '', flex: 1 },
      { field: 'stockCode', headerName: 'StockCode', tooltipField: 'stockCode', flex: 1 },
      { field: 'stockFirmName', headerName: 'StockFirmName', tooltipField: 'stockFirmName', flex: 1 },
      { field: 'stockHoldings', headerName: 'StockHoldings', tooltipField: 'stockHoldings', flex: 1 },
      { field: 'buyingDate', headerName: 'BuyingDate', tooltipField: 'buyingDate', flex: 1 },
      { field: 'buyingPrice', headerName: 'BuyingPrice', tooltipField: 'buyingPrice', flex: 1 },
      { field: 'targetDate', headerName: 'TargetDate', tooltipField: 'targetDate', flex: 1 },
      { field: 'targetPrice', headerName: 'TargetPrice', tooltipField: 'targetPrice', flex: 1 },
      { field: 'source', headerName: 'Source', tooltipField: 'source', flex: 1 },
      { field: 'currency', headerName: 'Currency', tooltipField: 'currency', flex: 1 },
      { field: 'rateOfExchange', headerName: 'RateOfExchange', tooltipField: 'rateOfExchange', flex: 1 },
      { field: 'marketType', headerName: 'MarketType', tooltipField: 'marketType', flex: 1 },
    ];
  }, [stocks]);

  const handleClickReset = React.useCallback(async () => {
    const confirmed = await confirm('Are you sure?');
    if (!confirmed) return;

    setHoldingStocks([]);
    setSelectedHoldingStock(null);
  }, [])

  const getHoldingStocks = React.useCallback(async (sequence?: number) => {
    await fetch(process.env.REACT_APP_BASE_URL + '/stock/holdingstocks', {
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

  const handleRowClick = React.useCallback(async (event: RowClickedEvent<HoldingStock>) => {
    const sequence = event.data?.sequence;

    if (!sequence) {
      await alert('sequence is empty.');
      return;
    }

    await getHoldingStocks(sequence)
      .then(() => setHoldingStockModalOpen(true));
  }, [getHoldingStocks]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div>
        <Button onClick={handleClickReset}>Reset</Button>
        <Button onClick={handleClickHoldingStockList}>HoldingStock List</Button>
      </div>
      <Divider />
      <div>
        <div className='ag-theme-alpine' style={{ height: 600, width: '100%' }}>
          <AgGridReact<HoldingStock>
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={holdingStocks}
            onRowClicked={handleRowClick}
          />
        </div>
      </div>

      <HoldingStockModal
        stocks={stocks}
        getHoldingStocks={getHoldingStocks}
      />
    </div>
  );
}

export default HoldingStocks;
