import React from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from "ag-grid-react";
import {ColDef, BodyScrollEndEvent} from "ag-grid-community";

import {
    Box,
    Modal,
    Button,
} from '@mui/material';
import {Visitor, Message} from "../interfaces";
import {useVisitor, useMessage} from "../hooks";
import ActionsRenderer from "./Renderers/ActionsRenderer";
import { StockTable, Test, MapTest } from '.';


type TabType = 'Visitor' | 'Message' | 'Stock' | 'Test' | 'MapTest';

interface Props {
    open: boolean,
    setOpen: (open: boolean) => void,
}

const ListModal = (props: Props) => {
    //
    const { open, setOpen } = props;

    const handleClose = React.useCallback(() => {
        setOpen(false)
    }, []);

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

    const [tab, setTab] = React.useState<TabType>('Visitor');

    const { visitors, fetchNextPageVisitors, removeVisitor } = useVisitor(open);
    const { messages, fetchNextPageMessages, removeMessage } = useMessage(open);

    // const [gridApi, setGridApi] = React.useState<GridApi | null>(null);
    // const [columnApi, setColumnApi] = React.useState<ColumnApi | null>(null);

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

    const onBodyScrollEndVisitor = React.useCallback(async (event: BodyScrollEndEvent) => {
        const { direction, api } = event;
        if (direction === 'vertical' && api.getLastDisplayedRow() + 1 === visitors.length) {
            await fetchNextPageVisitors();
        }
    }, [visitors]);

    const onBodyScrollEndMessage = React.useCallback(async (event: BodyScrollEndEvent) => {
        const { direction, api } = event;
        if (direction === 'vertical' && api.getLastDisplayedRow() + 1 === messages.length) {
            await fetchNextPageMessages();
        }
    }, [messages]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/*<Typography id="modal-modal-title" variant="h6" component="h2">*/}
                {/*    List Modal*/}
                {/*</Typography>*/}
                {/*<Typography id="modal-modal-description" sx={{ mt: 2 }}>*/}
                {/*    Admin Only*/}
                {/*</Typography>*/}

                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                    <Button style={{ marginLeft: '3px', marginRight: '3px', backgroundColor: '#E8B09F' }} variant='contained' size='small' onClick={() => setTab('Visitor')}>Visitor</Button>
                    <Button style={{ marginLeft: '3px', marginRight: '3px', backgroundColor: '#E8B09F' }} variant='contained' size='small' onClick={() => setTab('Message')}>Message</Button>
                    <Button style={{ marginLeft: '3px', marginRight: '3px', backgroundColor: '#E8B09F' }} variant='contained' size='small' onClick={() => setTab('Stock')}>Stock</Button>
                    <Button style={{ marginLeft: '3px', marginRight: '3px', backgroundColor: '#E8B09F' }} variant='contained' size='small' onClick={() => setTab('Test')}>Test</Button>
                    <Button style={{ marginLeft: '3px', marginRight: '3px', backgroundColor: '#E8B09F' }} variant='contained' size='small' onClick={() => setTab('MapTest')}>MapTest</Button>
                </div>

                {tab === "Visitor" && <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
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
                </div>}
                {tab === "Message" && <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
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
                </div>}
                {tab === "Stock" && <div style={{height: 400, width: '100%'}}>
                    <StockTable />
                </div>}
                {tab === "Test" && <div style={{height: 400, width: '100%'}}>
                    <Test />
                </div>}
                {tab === "MapTest" && <div style={{height: 400, width: '100%'}}>
                    <MapTest visitors={visitors} />
                </div>}
            </Box>
        </Modal>
    );
}

export default ListModal;
