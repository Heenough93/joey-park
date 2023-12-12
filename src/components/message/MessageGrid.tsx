import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { BodyScrollEndEvent, ColDef } from 'ag-grid-community';

import { Message } from "../../interfaces";
import { useMessage } from '../../hooks';
import ActionsRenderer from '../Renderers/ActionsRenderer';


const MessageGrid = () => {
  //
  const { messages, fetchNextPageMessages, removeMessage } = useMessage(true);

  const defaultColDef: ColDef = React.useMemo(() => {
    return {
      editable: false,
      filter: false,
    }
  }, []);

  const columnDefsMessage: ColDef[] = React.useMemo(() => {
    return [
      { headerName: "No.", valueGetter: (params) => typeof params.node?.rowIndex === 'number' ? params.node?.rowIndex + 1 : 0, flex: 1 },
      { field: "name", headerName: "Name", tooltipField: "name", flex: 1 },
      { field: "email", headerName: "Email", tooltipField: "email", flex: 1 },
      { field: "subject", headerName: "Subject", tooltipField: "subject", flex: 1 },
      { field: "message", headerName: "Message", tooltipField: "message", flex: 1 },
      { field: "date", headerName: "Date", tooltipField: "date", flex: 1 },
      { cellRenderer: "actionsRenderer", cellRendererParams: { removeFn: removeMessage },flex: 0.5 },
    ];
  }, []);

  const components = {
    actionsRenderer: ActionsRenderer,
  };

  const onBodyScrollEndMessage = React.useCallback(async (event: BodyScrollEndEvent) => {
    const { direction, api } = event;
    if (direction === 'vertical' && api.getLastDisplayedRow() + 1 === messages.length) {
      await fetchNextPageMessages();
    }
  }, [messages]);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact<Message>
        columnDefs={columnDefsMessage}
        defaultColDef={defaultColDef}
        rowData={messages}
        // getRowNodeId={data => data.id}
        // onGridReady={onGridReadyMessage}
        onBodyScrollEnd={onBodyScrollEndMessage}
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
  );
}

export default MessageGrid;
