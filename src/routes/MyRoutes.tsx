import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import {
  PortfolioPage,
  VisitorPage,
  MessagePage,
  StockPage,
  TestPage,
  MapPage,
  NotFoundPage,
} from '../pages';
import {
  Auth,
  User,
  Author,
  Book,
  StockTable,
  Stocks,
  HoldingStocks,
} from '../components';


const MyRoutes = () => {
  //
  return (
    useRoutes([
      {
        path: '/',
        element: <PortfolioPage />,
      },
      {
        path: 'visitor',
        element: <VisitorPage />,
      },
      {
        path: 'message',
        element: <MessagePage />,
      },
      {
        path: 'stock',
        element: (<>
          <StockPage />
          <Outlet />
        </>),
        children: [
          {
            path: 'stock-table',
            element: <StockTable />,
          },
          {
            path: 'stocks',
            element: <Stocks />,
          },
          {
            path: 'holding-stocks',
            element: <HoldingStocks />,
          },
        ],
      },
      {
        path: 'test',
        element: (<>
          <TestPage />
          <Outlet />
        </>),
        children: [
          {
            path: 'auth',
            element: <Auth />,
          },
          {
            path: 'user',
            element: <User />,
          },
          {
            path: 'author',
            element: <Author />,
          },
          {
            path: 'book',
            element: <Book />,
          },
        ],
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ])

  );
}

export default MyRoutes;
