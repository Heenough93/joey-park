import React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import {
  PortfolioPage,
  VisitorPage,
  MessagePage,
  StockPage,
  TestPage,
  MapPage,
} from '../pages';
import { Auth, User } from '../components';


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
        element: <StockPage />,
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
        ],
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      }
    ])

  );
}

export default MyRoutes;
