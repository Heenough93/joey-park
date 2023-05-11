import React from 'react';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {ILoginInfo, IOffsetResponse} from "../interfaces";

export const useLogin = (open: boolean) => {
    const queryFn = (offset: number, limit: number) => fetch(process.env.REACT_APP_BASE_URL + "find-login-infos-offset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offset, limit })
    });
    const queryKey = ['login'];

    const [loginInfos, setLoginInfos] = React.useState<ILoginInfo[]>([]);

    const { refetch, fetchNextPage } = useInfiniteQuery<IOffsetResponse<ILoginInfo>, Error, IOffsetResponse<ILoginInfo>, string[]>({
        queryKey,
        queryFn: async (queryFuncCtx) => {
            const res = await queryFn(
                queryFuncCtx.pageParam ? queryFuncCtx.pageParam.offset : 0,
                queryFuncCtx.pageParam ? queryFuncCtx.pageParam.limit : 50,
            );
            return res.json();
        },
        getNextPageParam: (res) => {
            if (res.total >= res.offset + res.limit) {
                return { offset: res.offset + res.limit, limit: 50 };
            } else {
                return undefined;
            }
        },
        onSuccess: (res) => {
            const loginInfos = res.pages.reduce((prev, curr) => {
                const data = curr.data;
                if (data) {
                    prev.push(...data);
                }
                return prev;
            }, [] as ILoginInfo[]);
            setLoginInfos(loginInfos);
        },
        onError: (error) => {
            console.log('error', error);
        },
        staleTime: 10,
        enabled: open,
    });

    const { mutateAsync } = useMutation({
        mutationFn: async ({}) => {
            return null;
        },
        onError: (error) => {
            console.log('error', error);
        },
    });

    return {
        loginInfos,
        setLoginInfos,
        refetch,
        fetchNextPage,
        mutateAsync,
    }
}