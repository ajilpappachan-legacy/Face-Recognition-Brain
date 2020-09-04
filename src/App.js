import React from 'react';
import './App.css';
import Particles from './components/particles/Particles';
import Navbar from './components/navigation/Navbar';
import Logo from './components/logo/Logo';
import LinkBar from './components/linkBar/LinkBar';
import Rank from './components/rank/Rank';

function App() {
  return (
    <div className="App">
      <Particles/>
      <Navbar/>
      <Logo/>
      <Rank/>
      <LinkBar/>
    </div>
  );
}

export default App;
