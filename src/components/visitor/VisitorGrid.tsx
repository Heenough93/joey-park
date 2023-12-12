import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { BodyScrollEndEvent, ColDef } from 'ag-grid-community';

import { Visitor } from "../../interfaces";
import { useVisitor } from '../../hooks';
import ActionsRenderer from '../Renderers/ActionsRenderer';


const VisitorGrid = () => {
  //
  const { visitors, fetchNextPageVisitors, removeVisitor } = useVisitor(true);

  const defaultColDef: ColDef = React.useMemo(() => {
    return {
      editable: false,
      filter: false,
    }
  }, []);

  const columnDefsVisitor: ColDef[] = React.useMemo(() => {
    return [
      { headerName: "No.", valueGetter: (params) => typeof params.node?.rowIndex === 'number' ? params.node?.rowIndex + 1 : 0, flex: 1 },
      { field: "IPv4", headerName: "IPv4", tooltipField: "IPv4", flex: 1 },
      { field: "platform", headerName: "Platform", tooltipField: "platform", flex: 1 },
      { field: "country_name", headerName: "Country", tooltipField: "country_name", flex: 1 },
      { field: "city", headerName: "City", tooltipField: "city", flex: 1 },
      { field: "date", headerName: "Date", tooltipField: "date", flex: 1 },
      { cellRenderer: "actionsRenderer", cellRendererParams: { removeFn: removeVisitor },flex: 0.5 },
    ];
  }, []);

  const components = {
    actionsRenderer: ActionsRenderer,
  };

  const onBodyScrollEndVisitor = React.useCallback(async (event: BodyScrollEndEvent) => {
    const { direction, api } = event;
    if (direction === 'vertical' && api.getLastDisplayedRow() + 1 === visitors.length) {
      await fetchNextPageVisitors();
    }
  }, [visitors]);

  return (
    <>
      <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
        <AgGridReact<Visitor>
          columnDefs={columnDefsVisitor}
          defaultColDef={defaultColDef}
          rowData={visitors}
          // getRowNodeId={data => data.id}
          // onGridReady={onGridReadyVisitor}
          onBodyScrollEnd={onBodyScrollEndVisitor}
          suppressScrollOnNewData
          suppressBrowserResizeObserver
          components={components}
          editType="fullRow"
          suppressClickEdit
          // statusBar={{
          //     statusPanels: [{ statusPanel: "addRowStatusBar" }]
          // }}
        />
      </div>
    </>
  );
}

export default VisitorGrid;
