import React from 'react';
import {
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
    pic12Image
} from "../images";

const Work = () => {
    //
    return (
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
    );
}

export default Work;
