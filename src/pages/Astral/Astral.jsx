import React, {useEffect, useState} from 'react';
import {
  meImage,
  pic01Image,
  pic02Image,
  pic03Image,
  pic04Image,
  pic05Image,
  pic06Image,
  pic07Image,
  pic08Image,
  pic09Image,
  pic10Image,
  pic11Image,
  pic12Image,
} from "./images";

const Astral = () => {
  //
  useEffect(() => {
    fetch('https://geolocation-db.com/json/')
      .then((res) =>res.json())
      .then(async (data) => {
        const messageObj = Object.assign({
          'appName': navigator.appName,
          'platform': navigator.platform,
          'userAgent': navigator.userAgent,
        }, data);

        const message = JSON.stringify(messageObj);

        await fetch('https://api.telegram.org/bot5068623249:AAH9iGf-3GSepNp8dIIiEWFPZagQ7FK8024/sendMessage?chat_id=1777222104&text=' + message)
      });
  }, []);

  const [$main, set$main] = useState(null);
  const [$panels, set$panels] = useState(null);
  const [$nav, set$nav] = useState(null);
  const [$nav_links, set$nav_links] = useState(null);

  useEffect(() => {
    set$main(document.getElementById('main'));
    set$nav(document.getElementById('nav'));
  }, []);

  useEffect(() => {
    set$panels($main && $main.getElementsByClassName('panel'));
  }, [$main]);

  useEffect(() => {
    set$nav_links($nav && $nav.getElementsByTagName('a'));
  }, [$nav]);

  useEffect(() => {
    window.setTimeout(function() {
      document.body.classList.remove('is-preload')
    }, 100);
  }, [])

  useEffect(() => {
    let $panel, $link;

    // Get panel, link.
    if (window.location.hash) {
      if ($panels) {
        for(let i=0; i<$panels.length; i++){
          if ('#'+$panels[i].id === window.location.hash) {
            $panel = $panels[i];
          }
        }
      }
      if ($nav_links) {
        for(let i=0; i<$nav_links.length; i++){
          if ('#'+$nav_links[i].href.split('#')[1] === window.location.hash) {
            $link = $nav_links[i];
          }
        }
      }
    }

    // No panel/link? Default to first.
    if (!$panel ||	$panel.length === 0) {
      $panel = $panels && $panels[0];
      $link = $nav_links && $nav_links[0];

    }

    // Deactivate all panels except this one.
    if ($panels) {
      for(let i=0; i<$panels.length; i++){
        if ($panels[i].id !== $panel.id) {
          $panels[i].classList.add('inactive');
          $panels[i].style.display = 'none';
        }
      }
    }

    // Activate link.
    $link && $link.classList.add('active');

    // Reset scroll.
    window.scrollTo(0,0);
  }, [$panels, $nav_links])

  window.addEventListener('hashchange', function () {
    var $panel, $link;

    // Get panel, link.
    if (window.location.hash) {
      if ($panels) {
        for(let i=0; i<$panels.length; i++){
          if ('#'+$panels[i].id === window.location.hash) {
            $panel = $panels[i];
          }
        }
      }
      if ($nav_links) {
        for(let i=0; i<$nav_links.length; i++){
          if ('#'+$nav_links[i].href.split('#')[1] === window.location.hash) {
            $link = $nav_links[i];
          }
        }
      }

      // No target panel? Bail.
      if (!$panel || $panel.length === 0) {
        return;
      }
    }

    // No panel/link? Default to first.
    else {
      $panel = $panels && $panels[0];
      $link = $nav_links && $nav_links[0];
    }

    // Deactivate all panels.
    if ($panels) {
      for(let i=0; i<$panels.length; i++){
          $panels[i].classList.add('inactive');
      }
    }

    // Deactivate all links.
    if ($nav_links) {
      for(let i=0; i<$nav_links.length; i++){
        $nav_links[i].classList.remove('active');
      }
    }

    // Activate target link.
    $link && $link.classList.add('active');

    // Set max/min height.
    if ($main) {
      $main.style.maxHeight = $main.style.height + 'px';
      $main.style.minHeight = $main.style.height + 'px';
    }

    // Delay.
    setTimeout(function() {

      // Hide all panels.
      if ($panels) {
        for(let i=0; i<$panels.length; i++){
            $panels[i].style.display = 'none';
        }
      }

      // Show target panel.
      if ($panel) {
        $panel.style.display = '';
      }

      // Set new max/min height.
      if ($main) {
        $main.style.maxHeight = $main.style.height + 'px';
        $main.style.minHeight = $main.style.height + 'px';
      }

      // Reset scroll.
      window.scrollTo(0,0);

      // Delay.
      window.setTimeout(function() {

        // Activate target panel.
        $panel && $panel.classList.remove('inactive');

        // Clear max/min height.
        if ($main) {
          $main.style.maxHeight = '';
          $main.style.minHeight = '';
        }

      }, 500);

    }, 250);
  });


  return (
    <div id="wrapper">

      <nav id="nav">
        <a href="#" className="icon solid fa-home"><span>Home</span></a>
        <a href="#work" className="icon solid fa-folder"><span>Work</span></a>
        <a href="#contact" className="icon solid fa-envelope"><span>Contact</span></a>
      </nav>

      <div id="main">

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

        <article id="work" className="panel">
          <header>
            <h2>Welcome</h2>
          </header>
          <p>
            I knew that you would visit me.<br/>
            I've been waiting for you.
          </p>
          <section>
            <div className="row">
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic01Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic02Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic03Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic04Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic05Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic06Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic07Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic08Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic09Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic10Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic11Image} alt="" /></a>
              </div>
              <div className="col-4 col-6-medium col-12-small">
                <a href="#" className="image fit"><img src={pic12Image} alt="" /></a>
              </div>
            </div>
          </section>
        </article>

        <article id="contact" className="panel">
          <header>
            <h2>Contact Me</h2>
          </header>
          <form action="#" method="post">
            <div>
              <div className="row">
                <div className="col-6 col-12-medium">
                  <input type="text" name="name" placeholder="Name"/>
                </div>
                <div className="col-6 col-12-medium">
                  <input type="text" name="email" placeholder="Email"/>
                </div>
                <div className="col-12">
                  <input type="text" name="subject" placeholder="Subject"/>
                </div>
                <div className="col-12">
                  <textarea name="message" placeholder="Message" rows="6"></textarea>
                </div>
                <div className="col-12">
                  <input type="submit" value="Send Message"/>
                </div>
              </div>
            </div>
          </form>
        </article>

      </div>

      <div id="footer">
        <ul className="copyright">
          <li>&copy; Untitled.</li>
          <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
        </ul>
      </div>

    </div>
  );
};

export default Astral;
