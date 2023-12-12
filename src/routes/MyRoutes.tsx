import React from 'react';
import { useRoutes } from 'react-router-dom';

import {
  PortfolioPage,
  VisitorPage,
  MessagePage,
  StockPage,
  TestPage,
  MapPage,
} from '../pages';


const MyRoutes = () => {
  //
  return (
    useRoutes([
      {
        path: '/',
        element: <PortfolioPage />,
      },
      {
        path: '/visitor',
        element: <VisitorPage />,
      },
      {
        path: '/message',
        element: <MessagePage />,
      },
      {
        path: '/stock',
        element: <StockPage />,
      },
      {
        path: '/test',
        element: <TestPage />,
      },
      {
        path: '/map',
        element: <MapPage />,
      },
    ])

  );
}

export default MyRoutes;
