import React from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from "ag-grid-react";
import {GridReadyEvent} from "ag-grid-community/dist/lib/events";
import {ColDef, ColumnApi, GridApi} from "ag-grid-community";

import {
    Box,
    Modal,
    Typography,
    Button,
} from '@mui/material';
import {getSubmitInfos} from "../functions/functions";
import {ISubmitInfo} from "../interfaces";


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

    const [gridApi, setGridApi] = React.useState<GridApi | null>(null);
    const [columnApi, setColumnApi] = React.useState<ColumnApi | null>(null);

    const defaultColDef: ColDef = React.useMemo(() => {
        return {
            editable: false,
            filter: false,
        }
    }, []);

    const columnDefs: ColDef[] = React.useMemo(() => {
        return [
            {
                field: "name",
                headerName: "Name",
                flex: 1,
            },
            {
                field: "email",
                headerName: "Email",
                flex: 1,
            },
            {
                field: "subject",
                headerName: "Subject",
                flex: 1,
            },
            {
                field: "message",
                headerName: "Message",
                flex: 1,
            },
            {
                field: "date",
                headerName: "Date",
                flex: 1,
            },
        ];
    }, []);

    const [rowData, setRowData] = React.useState<ISubmitInfo[]>([]);

    const onGridReady = (params: GridReadyEvent) => {
        setGridApi(params.api);
        setColumnApi(params.columnApi);

        (getSubmitInfos)()
            .then((data) => {
                setRowData(data);
            })

        // fetch(
        //     "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
        // )
        //     .then(res => res.json())
        //     .then(data => {
        //         // data.forEach(row => (row.id = uuid()));
        //         setRowData(data.slice(0, 100));
        //     });
        // params.api.sizeColumnsToFit();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>

                <Button variant='contained' size='small' onClick={() => setTab('LoginInfo')}>LoginInfo</Button>
                <Button variant='contained' size='small' onClick={() => setTab('SubmitInfo')}>SubmitInfo</Button>

                <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
                    {tab === "LoginInfo" && <AgGridReact
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowData={rowData}
                        // getRowNodeId={data => data.id}
                        onGridReady={onGridReady}
                        // components={components}
                        editType="fullRow"
                        suppressClickEdit
                        // statusBar={{
                        //     statusPanels: [{ statusPanel: "addRowStatusBar" }]
                        // }}
                    />}
                    {tab === "SubmitInfo" && <AgGridReact
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowData={[]}
                        // getRowNodeId={data => data.id}
                        onGridReady={onGridReady}
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