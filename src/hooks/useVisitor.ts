import React from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Visitor, OffsetResponseData } from '../interfaces';
import { findVisitorsOffset, removeVisitor } from '../functions';


export const useVisitor = (open: boolean) => {
  const queryFn = (offset: number, limit: number) => findVisitorsOffset(offset, limit);
  const queryKey = [ 'visitor' ];

  const [ visitors, setVisitors ] = React.useState<Visitor[]>([]);

  const { refetch, fetchNextPage } = useInfiniteQuery<OffsetResponseData<Visitor[]>, Error, OffsetResponseData<Visitor[]>, string[]>({
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
      const visitors = res.pages.reduce((prev, curr) => {
        const data = curr.data;
        prev.push(...data);
        return prev;
      }, [] as Visitor[]);
      setVisitors(visitors);
    },
    onError: (error) => {
      console.log('error', error);
    },
    staleTime: 10,
    // refetchOnWindowFocus: false,
    enabled: open,
  });

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (visitor: Visitor) => {
      await removeVisitor(visitor.id);
      await queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  return {
    visitors,
    setVisitors,
    refetchVisitors: refetch,
    fetchNextPageVisitors: fetchNextPage,
    removeVisitor: mutateAsync,
  };
};