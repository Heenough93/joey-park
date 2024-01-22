import React from 'react';

import { meImage } from '../../images';


const Home = () => {
  //
  return (
    <article id="home" className="panel intro">
      <header>
        <h1>Joey Park</h1>
        <p>Web Developer</p>
      </header>
      <a href="#work" className="jumplink pic">
        <span className="arrow icon solid fa-chevron-right"><span>See my work</span></span>
        <img src={meImage} alt=""/>
      </a>
    </article>
  );
};

export default Home;
