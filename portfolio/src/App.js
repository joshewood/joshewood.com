import React, { useState, useEffect  } from 'react';
import logo from './logo.svg';
import './App.scss';

const adjectives = ['thoughtful', 'caring', 'passionate', 'humble', 'perceptive', 'friendly', 'professional', 'resourceful', 'front-end', 'back-end', 'senior'];
const consumeAdjective = () => adjectives.sort(() => { return 0.5 - Math.random();}).pop();
const isAnimationComplete = () => (adjectives.length === 0);
function App() {
  
  const [currentAdjective, setAdjective] = useState(consumeAdjective());
  useEffect(() => {
    
    const interval = setInterval(() => {      
      const randomAdjective = consumeAdjective();
      setAdjective(randomAdjective);
      if (isAnimationComplete()) {
        clearInterval(interval);
        return;
      }
    }, 1000)

    
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hey, I'm <span className="Accent">Josh</span>.</h1>
        <h2 className="AlignChildrenVertical">
          <span>I'm a </span>
          <span className={`WordCycler${(isAnimationComplete()) ? ' Settle' : ''}`}>
            <span className="WordCyclePlane">{currentAdjective}</span>
          </span> 
          <span>developer.</span>
        </h2>
      </header>
    </div>
  );
}

export default App;
