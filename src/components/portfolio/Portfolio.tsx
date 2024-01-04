import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Visitor } from "../../interfaces";
import {
  getGeolocationInfo,
  registerVisitor,
  // sendMessage,
} from "../../functions";
import { useSideBarStore } from '../../stores';
import { Loading } from '../common';
import Home from './Home';
import Work from './Work';
import Contact from './Contact';
import Footer from './Footer';
import { useDialog } from '../../hooks';


const Portfolio = () => {
  //
  const { prompt } = useDialog();

  const { setOpen: setSideBarOpen } = useSideBarStore();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [visitor, setVisitor] = React.useState<Visitor | null>(null);

  React.useEffect(() => {
    (getGeolocationInfo)()
      .then((data) => {
        setVisitor(data)
      });
  }, []);

  React.useEffect(() => {
    if (!visitor) return;

    setIsLoading(false);

    (registerVisitor)(Object.assign(visitor, { id: uuidv4(), date: new Date().toISOString() }));

    // const message = JSON.stringify(visitor);
    // (sendMessage)(message);
  }, [visitor]);

  const handleClickList = React.useCallback(async () => {
    //
    const password = await prompt('Admin Only!');
    if (password && password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setSideBarOpen(true)
    }
  }, []);

  return (
    <>
      <div hidden={!isLoading}>
        <div id="wrapper">
          <Loading />
        </div>
      </div>

      <div hidden={isLoading}>
        <div id="wrapper">
          <nav id="nav">
            <a className="icon solid fa-home" href="#"><span>Home</span></a>
            <a className="icon solid fa-folder" href="#work"><span>Work</span></a>
            <a className="icon solid fa-envelope" href="#contact"><span>Contact</span></a>
            <a className="icon solid fa-list" onClick={handleClickList}><span>List</span></a>
          </nav>

          <div id="main">
            <Home />
            <Work />
            <Contact visitor={visitor} />
          </div>

          <div id="footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
