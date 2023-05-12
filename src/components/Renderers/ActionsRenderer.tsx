import React from 'react';
import {ICellRendererParams} from "ag-grid-community";
import {UseMutateAsyncFunction} from "@tanstack/react-query";


export default (props: ICellRendererParams & { removeFn: UseMutateAsyncFunction}) => {
    //
    const onClickDelete = React.useCallback(async () => {
        const data = props.data;
        const confirm = window.confirm('Are you sure you want to delete this row?');
        if (confirm) {
            await props.removeFn(data);
        }
    }, []);

    return (
        <>
            <a
                className="icon solid fa-trash"
                onClick={onClickDelete}
            />
        </>
    )
}
