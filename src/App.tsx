import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Loading,
    Home,
    Work,
    Contact,
    ListModal,
    Footer,
} from "./components";
import {ILoginInfo} from "./interfaces";
import {getGeolocationInfo, registerLoginInfo} from "./functions";


function App() {
    //
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [loginInfo, setLoginInfo] = React.useState<ILoginInfo | null>(null);

    React.useEffect(() => {
        (getGeolocationInfo)()
            .then((data) => setLoginInfo(data));
    }, []);

    React.useEffect(() => {
        if (!loginInfo) return;

        setIsLoading(false);

        (registerLoginInfo)(Object.assign(loginInfo, { id: uuidv4(), date: new Date().toISOString() }));

        // const message = JSON.stringify(loginInfo);
        // (sendMessage)(message);
    }, [loginInfo]);

    const [listModalOpen, setListModalOpen] = React.useState(false);

    const onClickList = React.useCallback(() => {
        const password = prompt('Admin Only!');
        if (password && password === process.env.REACT_APP_ADMIN_PASSWORD) {
            setListModalOpen(true)
        }
    }, []);


    const [$main, set$main] = React.useState<HTMLElement | null>(null);
    const [$panels, set$panels] = React.useState<HTMLCollectionOf<Element> | null>(null);
    const [$nav, set$nav] = React.useState<HTMLElement | null>(null);
    const [$nav_links, set$nav_links] = React.useState<HTMLCollectionOf<HTMLAnchorElement> | null>(null);

    React.useEffect(() => {
        set$main(document.getElementById('main'));
        set$nav(document.getElementById('nav'));
    }, []);

    React.useEffect(() => {
        set$panels($main && $main.getElementsByClassName('panel'));
    }, [$main]);

    React.useEffect(() => {
        set$nav_links($nav && $nav.getElementsByTagName('a'));
    }, [$nav]);

    React.useEffect(() => {
        window.setTimeout(function() {
            document.body.classList.remove('is-preload')
        }, 100);
    }, [])

    React.useEffect(() => {
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
        if (!$panel) { //}	$panel.length === 0) {
            $panel = $panels && $panels[0];
            $link = $nav_links && $nav_links[0];

        }

        // Deactivate all panels except this one.
        if ($panels && $panel) {
            for(let i=0; i<$panels.length; i++){
                if ($panels[i].id !== $panel.id) {
                    $panels[i].classList.add('inactive');
                    ($panels[i] as any).style.display = 'none';
                }
            }
        }

        // Activate link.
        $link && $link.classList.add('active');

        // Reset scroll.
        window.scrollTo(0,0);
    }, [$panels, $nav_links])

    window.addEventListener('hashchange', function () {
        let $panel: any, $link;

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
            if (!$panel) { //} || $panel.length === 0) {
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
                    ($panels[i] as any).style.display = 'none';
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
        <div className="App">
            <div hidden={!isLoading}>
                <div id="wrapper">
                    <Loading />
                </div>
            </div>

            <div hidden={isLoading}>
                <div id="wrapper">
                    <nav id="nav">
                        <a href="#" className="icon solid fa-home"><span>Home</span></a>
                        <a href="#work" className="icon solid fa-folder"><span>Work</span></a>
                        <a href="#contact" className="icon solid fa-envelope"><span>Contact</span></a>
                        <a className="icon solid fa-list" onClick={onClickList}><span>List</span></a>
                    </nav>

                    <div id="main">
                        <Home />
                        <Work />
                        <Contact
                            loginInfo={loginInfo}
                        />
                        <ListModal
                            open={listModalOpen}
                            setOpen={setListModalOpen}
                        />
                    </div>

                    <div id="footer">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
