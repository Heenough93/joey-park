import React from 'react';
import {useInfiniteQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {Message, OffsetResponseData} from "../interfaces";
import {findMessagesOffset, removeMessage} from "../functions";

export const useMessage = (open: boolean) => {
    const queryFn = (offset: number, limit: number) => findMessagesOffset(offset, limit);
    const queryKey = ['nme'];

    const [messages, setMessages] = React.useState<Message[]>([]);

    const { refetch, fetchNextPage } = useInfiniteQuery<OffsetResponseData<Message[]>, Error, OffsetResponseData<Message[]>, string[]>({
        queryKey,
        queryFn: async (queryFuncCtx) => {
            const res = await queryFn(
                queryFuncCtx.pageParam ? queryFuncCtx.pageParam.offset : 0,
                queryFuncCtx.pageParam ? queryFuncCtx.pageParam.limit : 15,
            );
            return res;
        },
        getNextPageParam: (res) => {
            if (res.total >= res.offset + res.limit) {
                return { offset: res.offset + res.limit, limit: 15 };
            } else {
                return undefined;
            }
        },
        onSuccess: (res) => {
            const messages = res.pages.reduce((prev, curr) => {
                const data = curr.data;
                prev.push(...data);
                return prev;
            }, [] as Message[]);
            setMessages(messages);
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
        mutationFn: async (message: Message) => {
            await removeMessage(message.id);
            await queryClient.invalidateQueries(queryKey);
        },
        onError: (error) => {
            console.log('error', error);
        },
    });

    return {
        messages,
        setMessages,
        refetchMessages: refetch,
        fetchNextPageMessages: fetchNextPage,
        removeMessage: mutateAsync,
    }
}