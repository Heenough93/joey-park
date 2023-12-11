import React from 'react';
import { useRoutes } from 'react-router-dom';

import { Portfolio, Temp } from '../pages';


const MyRoutes = () => {
  //
  return (
    useRoutes([
      {
        path: '/',
        element: <Portfolio />,
      },
      {
        path: '/temp',
        element: <Temp />,
      },
    ])

  );
}

export default MyRoutes;
