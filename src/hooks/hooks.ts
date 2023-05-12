import React from 'react';
import {useInfiniteQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {ILoginInfo, ISubmitInfo, IOffsetResponse} from "../interfaces";
import {findLoginInfosOffset, removeLoginInfo, findSubmitInfosOffset, removeSubmitInfo} from "../functions";


export const useLogin = (open: boolean) => {
    const queryFn = (offset: number, limit: number) => findLoginInfosOffset(offset, limit);
    const queryKey = ['login'];

    const [loginInfos, setLoginInfos] = React.useState<ILoginInfo[]>([]);

    const { refetch, fetchNextPage } = useInfiniteQuery<IOffsetResponse<ILoginInfo>, Error, IOffsetResponse<ILoginInfo>, string[]>({
        queryKey,
        queryFn: async (queryFuncCtx) => {
            const res = await queryFn(
                queryFuncCtx.pageParam ? queryFuncCtx.pageParam.offset : 0,
                queryFuncCtx.pageParam ? queryFuncCtx.pageParam.limit : 10,
            );
            return res;
        },
        getNextPageParam: (res) => {
            if (res.total >= res.offset + res.limit) {
                return { offset: res.offset + res.limit, limit: 10 };
            } else {
                return undefined;
            }
        },
        onSuccess: (res) => {
            const loginInfos = res.pages.reduce((prev, curr) => {
                const data = curr.data;
                prev.push(...data);
                return prev;
            }, [] as ILoginInfo[]);
            setLoginInfos(loginInfos);
        },
        onError: (error) => {
            console.log('error', error);
        },
        staleTime: 10,
        // refetchOnWindowFocus: false,
        enabled: open,
    });

    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation({
        mutationFn: async (loginInfo: ILoginInfo) => {
            await removeLoginInfo({ id: loginInfo.id });
            await queryClient.invalidateQueries(queryKey);
        },
        onError: (error) => {
            console.log('error', error);
        },
    });

    return {
        loginInfos,
        setLoginInfos,
        refetchLoginInfos: refetch,
        fetchNextPageLoginInfos: fetchNextPage,
        removeLoginInfo: mutateAsync,
    }
}

export const useSubmit = (open: boolean) => {
    const queryFn = (offset: number, limit: number) => findSubmitInfosOffset(offset, limit);
    const queryKey = ['submit'];

    const [submitInfos, setSubmitInfos] = React.useState<ISubmitInfo[]>([]);

    const { refetch, fetchNextPage } = useInfiniteQuery<IOffsetResponse<ISubmitInfo>, Error, IOffsetResponse<ISubmitInfo>, string[]>({
        queryKey,
        queryFn: async (queryFuncCtx) => {
            const res = await queryFn(
                queryFuncCtx.pageParam ? queryFuncCtx.pageParam.offset : 0,
                queryFuncCtx.pageParam ? queryFuncCtx.pageParam.limit : 10,
            );
            return res;
        },
        getNextPageParam: (res) => {
            if (res.total >= res.offset + res.limit) {
                return { offset: res.offset + res.limit, limit: 10 };
            } else {
                return undefined;
            }
        },
        onSuccess: (res) => {
            const submitInfos = res.pages.reduce((prev, curr) => {
                const data = curr.data;
                prev.push(...data);
                return prev;
            }, [] as ISubmitInfo[]);
            setSubmitInfos(submitInfos);
        },
        onError: (error) => {
            console.log('error', error);
        },
        staleTime: 10,
        // refetchOnWindowFocus: false,
        enabled: open,
    });

    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation({
        mutationFn: async (submitInfo: ISubmitInfo) => {
            await removeSubmitInfo({ id: submitInfo.id });
            await queryClient.invalidateQueries(queryKey);
        },
        onError: (error) => {
            console.log('error', error);
        },
    });

    return {
        submitInfos,
        setSubmitInfos,
        refetchSubmitInfos: refetch,
        fetchNextPageSubmitInfos: fetchNextPage,
        removeSubmitInfo: mutateAsync,
    }
}