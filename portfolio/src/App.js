import React, { useState, useEffect  } from 'react';
import logo from './logo.svg';
import './App.css';

const adjectives = ['thoughtful', 'caring', 'passionate', 'humble', 'knowledgable', 'friendly', 'professional', 'artistic', 'front-end', 'back-end', 'senior'];
const consumeAdjective = () => adjectives.sort(() => { return 0.5 - Math.random();}).pop();
function App() {
  const [currentAdjective, setAdjective] = useState(consumeAdjective());
  useEffect(() => {
    
    const interval = setInterval(() => {
      const randomAdjective = consumeAdjective();
      setAdjective(randomAdjective);
      if (adjectives.length === 0) {
        clearInterval(interval);
      }
    }, 500)

    
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hey, I'm <span className="Accent">Josh</span>.</h1>
        <h2>
          <span>I'm a </span>
          <span className="WordCycler">
            <span className="WordCyclePlane">{currentAdjective}</span>
          </span> 
          <span>developer.</span>
        </h2>
      </header>
    </div>
  );
}

export default App;
