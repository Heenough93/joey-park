import React from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from "ag-grid-react";
import {BodyScrollEndEvent, GridReadyEvent} from "ag-grid-community/dist/lib/events";
import {ColDef} from "ag-grid-community";

import {
    Box,
    Modal,
    Button,
} from '@mui/material';
import {findSubmitInfos} from "../functions";
import {ILoginInfo, ISubmitInfo} from "../interfaces";
import {useLogin} from "../hooks";


type TabType = 'LoginInfo' | 'SubmitInfo';

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

    const [tab, setTab] = React.useState<TabType>('LoginInfo');

    // const [gridApi, setGridApi] = React.useState<GridApi | null>(null);
    // const [columnApi, setColumnApi] = React.useState<ColumnApi | null>(null);

    const defaultColDef: ColDef = React.useMemo(() => {
        return {
            editable: false,
            filter: false,
        }
    }, []);

    const columnDefsLogin: ColDef[] = React.useMemo(() => {
        return [
            { field: "IPv4", headerName: "IPv4", flex: 1 },
            { field: "platform", headerName: "Platform", flex: 1 },
            { field: "country_name", headerName: "Country", flex: 1 },
            { field: "city", headerName: "City", flex: 1 },
            { field: "date", headerName: "Date", flex: 1 },
        ];
    }, []);

    const columnDefsSubmit: ColDef[] = React.useMemo(() => {
        return [
            { field: "name", headerName: "Name", flex: 1 },
            { field: "email", headerName: "Email", flex: 1 },
            { field: "subject", headerName: "Subject", flex: 1 },
            { field: "message", headerName: "Message", flex: 1 },
            { field: "date", headerName: "Date", flex: 1 },
        ];
    }, []);

    const { loginInfos, fetchNextPage } = useLogin(open);

    const onBodyScrollEnd = React.useCallback(async (event: BodyScrollEndEvent) => {
        const { direction, api } = event;
        if (direction === 'vertical' && api.getLastDisplayedRow() + 1 === loginInfos.length) {
            await fetchNextPage();
        }
    }, [loginInfos]);

    const [rowDataSubmit, setRowDataSubmit] = React.useState<ISubmitInfo[]>([]);

    const onGridReadySubmit = React.useCallback((params: GridReadyEvent) => {
        (findSubmitInfos)()
            .then((data) => {
                setRowDataSubmit(data);
            })
    }, []);

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
                    <Button style={{ marginLeft: '3px', marginRight: '3px', backgroundColor: '#E8B09F' }} variant='contained' size='small' onClick={() => setTab('LoginInfo')}>LoginInfo</Button>
                    <Button style={{ marginLeft: '3px', marginRight: '3px', backgroundColor: '#E8B09F' }} variant='contained' size='small' onClick={() => setTab('SubmitInfo')}>SubmitInfo</Button>
                </div>

                <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
                    {tab === "LoginInfo" && <AgGridReact<ILoginInfo>
                        columnDefs={columnDefsLogin}
                        defaultColDef={defaultColDef}
                        rowData={loginInfos}
                        // getRowNodeId={data => data.id}
                        // onGridReady={onGridReadyLogin}
                        onBodyScrollEnd={onBodyScrollEnd}
                        suppressScrollOnNewData
                        suppressBrowserResizeObserver
                        // components={components}
                        editType="fullRow"
                        suppressClickEdit
                        // statusBar={{
                        //     statusPanels: [{ statusPanel: "addRowStatusBar" }]
                        // }}
                    />}
                    {tab === "SubmitInfo" && <AgGridReact<ISubmitInfo>
                        columnDefs={columnDefsSubmit}
                        defaultColDef={defaultColDef}
                        rowData={rowDataSubmit}
                        // getRowNodeId={data => data.id}
                        onGridReady={onGridReadySubmit}
                        suppressBrowserResizeObserver
                        // components={components}
                        editType="fullRow"
                        suppressClickEdit
                        // statusBar={{
                        //     statusPanels: [{ statusPanel: "addRowStatusBar" }]
                        // }}
                    />}
                </div>
            </Box>
        </Modal>
    );
}

export default ListModal;
