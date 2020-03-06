import React, { useState, useEffect  } from 'react';
import logo from './logo.svg';
import './App.scss';

const adjectives = ['thoughtful', 'creative', 'caring', 'passionate', 'humble', 'perceptive', 'friendly', 'professional', 'resourceful', 'front-end', 'back-end', 'senior'];
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
      <header className="IntroPanel">
        <h1>Hey, I'm <span className="Accent">Josh</span>.</h1>
        <h2 className="AlignChildrenVertical">
          <span>I'm a </span>
          <span className={`WordCycler${(isAnimationComplete()) ? ' Settle' : ''}${(fastForward) ? ' FastForward' : ''}`}>
            <span className="WordCyclePlane">{currentAdjective}</span>
          </span> 
          <span>developer.</span>
        </h2>
      </header>
    </div>
  );
}

export default App;
