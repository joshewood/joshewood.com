import React, { useState, useEffect, useMemo  } from 'react';
import logo from './logo.svg';
import { SocialIcon } from 'react-social-icons';

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
  const [currentAdjective, setAdjective] = useState(consumeAdjective());
  const [fastForward, setFastForward] =  useState(false);
  const [CTAEffect, changeCTAEffect] = useState('Empty');
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
  return (
    <div className="App">
      <div className="IntroPanel">
        <div className={`ResumeContainer ${CTAEffect}`} onClick={downloadResume}>
          <h1>Hey, my name's <span className="Accent">Josh</span>,</h1>
          <h2 className="AlignChildrenVertical">
            <span>and I'm a </span>
            <span className={`WordCycler${(isAnimationComplete()) ? ' Settle' : ''}${(fastForward) ? ' FastForward' : ''}`}>
              <span className="WordCyclePlane">{currentAdjective}</span>
            </span> 
            <span>developer.</span>
          </h2>

          <button type="button" className="MainCTA">R&eacute;sum&eacute;</button>
        </div>
      </div>
      <div className="SummaryPanel">
        <h1>I have been <span className="Accent">building</span> software my whole life.</h1>
        <h2>Love it when a <span className="Accent">plan</span> comes together.</h2>
        <h2>Worked alongside <span className="Accent">brilliant</span> people.</h2>
        <h2>Crave <span className="Accent">collaboration</span>.</h2>
      </div>
      <div className="WorkPanel">
        <h1>I made <a href="www.dawnofwar.com">www.dawnofwar.com</a></h1>
        <h2>I delivered numerous features on <a href="www.hardrocksocialcasino.com">www.hardrocksocialcasino.com</a></h2>
        <h3>The same engine as <a href="play.star.com.au">play.star.com.au</a></h3>
        <h3>and <a href="online.foxwoods.com">online.foxwoods.com</a></h3>
        {/*<h2>I've built</h2>
        <ul>
          <li>Features</li>
          <li>Tools</li>
          <li>Integrations</li>
          <li>Proofs of Concept</li>
        </ul>*/}
      </div>
      <div className="DogPanel">
        <h1>Also I love my dog.</h1>
        <img className="Doggo" src="/zero.jpg"/>
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
    </div>
  );
}

export default App;
