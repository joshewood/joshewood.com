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

const adjectives = [
  'thoughtful', 'creative', 'persistent', 
  'passionate', 'software', 'humble', 
  'perceptive', 'friendly', 'web', 
  'game', 'versatile', 'positive', 
  'professional', 'resourceful', 'front-end', 
  'back-end', 'senior', 'driven'
];
const consumeAdjective = () => adjectives.sort(() => { return 0.5 - Math.random();}).pop();
const isAnimationComplete = () => (adjectives.length === 0);
function App() {
  const [entranceAnimation, beginEntrance] = useState(false);
  const [currentAdjective, setAdjective] = useState(consumeAdjective());
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
    
    let iteration = 0;
    let interval;
    const tick = () => {
      iteration++;
      const randomAdjective = consumeAdjective();
      setAdjective(randomAdjective);
      if (isAnimationComplete()) {
        clearInterval(interval);
        return;
      }
    }

    interval = setInterval(() => {
      if (iteration == 1) {
        clearInterval(interval);
        interval = setInterval(tick, 250);
        setFastForward(true);
      }
      tick();
    }, 1000)
  }, []);  
  let location = useLocation();
  return (<div className={`App${(hasLoaded) ? ' Loaded' : ''}`}>
      <TransitionGroup>
        {/*
          This is no different than other usage of
          <CSSTransition>, just make sure to pass
          `location` to `Switch` so it can match
          the old location as it animates out.
        */}
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={300}
        >
          <Switch location={location}>
            <Route exact path="/">
              <div className={`IntroPanel${(entranceAnimation) ? ' Enter' : ''}`}>
                <div className={`CTAContainer ResumeContainer ${CTAEffect}`} onClick={downloadResume}>
                  <h1>Hey, my name's <span className="Accent">Josh</span>,</h1>
                  
                  <button type="button" className="HomeCTA">R&eacute;sum&eacute;</button>
                  
                </div>
                <Link className="CTAContainer PortfolioLinkContainer" to="/portfolio">
                  <h2>I'm a developer</h2>
                  <button type="button" className="HomeCTA SecondaryCTA">Portfolio</button>
                </Link>
              </div>
              <hr className="BorderDecoration"/>
            </Route>
            <Route path="/portfolio">
              <div className="WorkPanel">
                {/*<video autoPlay loop mute src="dawnofwar.mp4"></video>*/}
                <h1>I made <a href="https://www.dawnofwar.com">www.dawnofwar.com</a></h1>
                <h2>I delivered numerous features on <a href="https://www.hardrocksocialcasino.com">www.hardrocksocialcasino.com</a></h2>
                <h3>The same engine as <a href="https://play.star.com.au">play.star.com.au</a></h3>
                <h3>and <a href="https://online.foxwoods.com">online.foxwoods.com</a></h3>
                {/*<h2>I've built</h2>
                <ul>
                  <li>Features</li>
                  <li>Tools</li>
                  <li>Integrations</li>
                  <li>Proofs of Concept</li>
                </ul>*/}
              </div>
              <div className="SummaryPanel">
                <h1>I have been <span className="Accent">building</span> software my whole life.</h1>
                <h2>Love it when a <span className="Accent">plan</span> comes together.</h2>
                <h2>Worked alongside <span className="Accent">brilliant</span> people.</h2>
                <h2>Crave <span className="Accent">collaboration</span>.</h2>
              </div>
              <div className="ConnectPanel">
                <h1>Let's chat! We have so much in common!</h1>
                <ul className="SocialLinks">
                  <li>
                    <SocialIcon url="https://www.linkedin.com/in/agamedesigner/" />
                  </li>
                  <li>
                    <SocialIcon url="https://www.facebook.com/josh.wood.12576" />
                  </li>
                  <li>
                    <SocialIcon url="mailto:gdjoshwood@gmail.com" />
                  </li>
                  <li>
                    <SocialIcon url="https://www.instagram.com/maremmazero/"/>
                    </li>
                </ul>
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
