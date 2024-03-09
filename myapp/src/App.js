import React from 'react';
import Board from './components/Board';
import './App.css';
import { Auth } from './components/auth';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Chutes And Ladders</h1>
      </header>
      <Auth/>
      <Board />
    </div>
  );
}

export default App;
