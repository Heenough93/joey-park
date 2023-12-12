import React from 'react';
import { useRoutes } from 'react-router-dom';

import {
  PortfolioPage,
  Visitor,
  Message,
  Stock,
  Test,
  Map,
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
        element: <Visitor />,
      },
      {
        path: '/message',
        element: <Message />,
      },
      {
        path: '/stock',
        element: <Stock />,
      },
      {
        path: '/test',
        element: <Test />,
      },
      {
        path: '/map',
        element: <Map />,
      },
    ])

  );
}

export default MyRoutes;
