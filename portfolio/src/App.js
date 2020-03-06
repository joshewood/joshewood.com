import React, { useState, useEffect  } from 'react';
import logo from './logo.svg';
import './App.scss';

const adjectives = ['thoughtful', 'creative', 'caring', 'passionate', 'humble', 'perceptive', 'friendly', 'web', 'game', 'versatile', 'positive', 'professional', 'resourceful', 'front-end', 'back-end', 'senior'];
const consumeAdjective = () => adjectives.sort(() => { return 0.5 - Math.random();}).pop();
const isAnimationComplete = () => (adjectives.length === 0);
function App() {
  
  const [currentAdjective, setAdjective] = useState(consumeAdjective());
  const [fastForward, setFastForward] =  useState(false);
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
        <div className="ResumeContainer">
          <h1>Hey, I'm <span className="Accent">Josh</span>.</h1>
          <h2 className="AlignChildrenVertical">
            <span>I'm a </span>
            <span className={`WordCycler${(isAnimationComplete()) ? ' Settle' : ''}${(fastForward) ? ' FastForward' : ''}`}>
              <span className="WordCyclePlane">{currentAdjective}</span>
            </span> 
            <span>developer.</span>
          </h2>

          <button type="button" className="MainCTA">R&eacute;sum&eacute;</button>
        </div>
      </div>
      <div className="SummaryPanel">
        <h1>I have been <span className="Accent">building</span> software for most of my life.</h1>
        <h2>Love it when a <span className="Accent">plan</span> comes together.</h2>
        <h2>Worked alongside <span className="Accent">brilliant</span> people.</h2>
        <h2>I love working on <span className="Accent">teams</span>.</h2>
      </div>
      <div className="WorkPanel">
        <h1>I made www.dawnofwar.com</h1>
        <h2>I delivered numerous features on www.hardrocksocialcasino.com</h2>
        <h2>I've built</h2>
        <ul>
          <li>Features</li>
          <li>Tools</li>
          <li>Integrations</li>
          <li>Proofs of Concept</li>
        </ul>
      </div>
      <div className="DogPanel">
        <h1>Also I love my dog.</h1>
      </div>
    </div>
  );
}

export default App;
