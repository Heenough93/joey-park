import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import { MyRoutes } from './routes';
import { ModalContextProvider, SideBar } from './components';


const App = () => {
  //
  return (
    <div className="App">
      <BrowserRouter>
        <ModalContextProvider>
          <MyRoutes />
          <SideBar />
        </ModalContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
