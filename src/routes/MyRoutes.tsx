import React from 'react';
import { useRoutes } from 'react-router-dom';

import {
  Portfolio,
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
        element: <Portfolio />,
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
