import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import {
  PortfolioPage,
  VisitorPage,
  MessagePage,
  MapPage,
  StockPage,
  TestPage,
  MyMapPage,
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
        path: 'map',
        element: <MapPage />,
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
        path: 'my-map',
        element: <MyMapPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ])

  );
}

export default MyRoutes;
