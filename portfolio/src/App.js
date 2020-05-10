import React, { useState, useEffect, useMemo  } from 'react';
import logo from './logo.svg';
import { SocialIcon } from 'react-social-icons';
import {  
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import './App.scss';

function App() {
  const [entranceAnimation, beginEntrance] = useState(false);
  const [fastForward, setFastForward] =  useState(false);
  const [CTAEffect, changeCTAEffect] = useState('Empty');
  const [hasLoaded, setHasLoaded] = useState(false);
  let downloadResume = () => {
    changeCTAEffect('Engaged');
    setTimeout(()=> {
      changeCTAEffect('Fade');
      setTimeout(()=> {
        changeCTAEffect('Empty');
      }, 500)
    }, 800)

    window.location.assign('resume.pdf');
  };
  useEffect(() => {
    setHasLoaded(true);
    beginEntrance(true);
  }, []);  
  let location = useLocation();
  return (<div className={`App${(hasLoaded) ? ' Loaded' : ''}${(location.pathname == '/') ? ' Home' : ''}`}>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="slide"
          timeout={900}
        >
          <Switch location={location}>
            <Route exact path="/">
            <div>
              <div className={`IntroPanel${(entranceAnimation) ? ' Enter' : ''}`}>
                <div className={`CTAContainer ResumeContainer ${CTAEffect}`} onClick={downloadResume}>
                  <hr className="BorderDecoration Top"/>  
                  <h1>Hey, my name's <span className="Accent">Josh</span>,</h1>
                  <button type="button" className="HomeCTA">R&eacute;sum&eacute;</button>
                  <hr className="BorderDecoration"/>  
                </div>
                
                <Link className="CTAContainer PortfolioLinkContainer" to="/portfolio">
                  <hr className="BorderDecoration Top"/>  
                  <h2>I'm a developer</h2>
                  <button type="button" className="HomeCTA SecondaryCTA">Portfolio</button>
                  <hr className="BorderDecoration"/>
                </Link>
              </div>
              
            </div>
            </Route>
            <Route path="/portfolio">
              <div className="WorkPanel">
                
                <div className={`CTAContainer Short ResumeContainer ${CTAEffect}`} onClick={() => {window.location.assign('https://www.dawnofwar.com')}}>
                  <hr className="BorderDecoration Top"/>  
                  <a href="https://www.dawnofwar.com">www.dawnofwar.com</a>
                  <video loop mute src="dawnofwar.mp4"></video>
                  <hr className="BorderDecoration"/>
                </div>
                
                <div className={`CTAContainer ResumeContainer ${CTAEffect}`} onClick={() => {window.location.assign('https://www.hardrocksocialcasino.com')}}>
                  <hr className="BorderDecoration Top"/>  
                  <a className="SupportHeader" href="#">Greentube Pro</a>
                  <div className="GreentubeProTooltip">
                    <ul className="GreentubeProClients">
                      <li className="">
                        <a href=">www.hardrocksocialcasino.com">
                          <div>www.hardrocksocialcasino.com</div>
                          <video loop mute src="hardrock.mp4"></video>
                        </a>
                      </li>
                      <li className="">
                        <a href=">online.foxwoods.com">
                          <div>online.foxwoods.com</div>
                          <video loop mute src="foxwoods.mp4"></video>
                        </a>
                      </li>
                      <li className="">
                        <a href=">play.star.com.au">
                          <div>play.star.com.au</div>
                          <video loop mute src="star.mp4"></video>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="VideoGallery">
                    {/*<video loop mute src="dawnofwar.mp4"></video>
                    <video loop mute src="dawnofwar.mp4"></video>
                    <video loop mute src="dawnofwar.mp4"></video>*/}
                  </div>
                  <hr className="BorderDecoration"/>
                </div>

                <div className={`CTAContainer Short SocialLinks`}>
                  <hr className="BorderDecoration Top"/>  
                  <ul className="SocialLinks">
                    <li>
                      <SocialIcon url="/resume.pdf"/>
                    </li>
                    <li>
                      <SocialIcon url="https://www.linkedin.com/in/agamedesigner/" />
                    </li>
                    <li>
                      <SocialIcon url="mailto:gdjoshwood@gmail.com" />
                    </li>
                    <li>
                      <SocialIcon url="https://github.com/joshewood/"/>
                    </li>
                  </ul>
                  <hr className="BorderDecoration"/>
                </div>
              </div>
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>        

    </div>
  );
}

const BrowserApp = () => <Router><App/></Router>

export default BrowserApp;
