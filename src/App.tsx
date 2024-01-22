import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { MyRoutes } from './routes';
import { SideBar } from './components';


const App = () => {
  //
  return (
    <div className="App">
      <BrowserRouter>
        <MyRoutes />
        <SideBar />
      </BrowserRouter>
    </div>
  );
};

export default App;
