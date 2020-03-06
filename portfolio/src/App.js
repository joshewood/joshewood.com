import React, { useState, useEffect  } from 'react';
import logo from './logo.svg';
import './App.css';

const adjectives = ['thoughtful', 'caring', 'passionate', 'humble', 'knowledgable', 'friendly', 'expert', 'artistic', 'front-end', 'back-end', 'senior'];
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
        Hey, I'm Josh.
        I'm a {currentAdjective} developer.
      </header>
    </div>
  );
}

export default App;
