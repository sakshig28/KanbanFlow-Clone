import React from 'react';
import Board from './components/Board';
import './App.css';
import { Auth } from './components/auth';

function App() {
  return (
    <div className="App">
      <Auth/>
      <header className="App-header">
        <h1 className="App-title">Trello Clone</h1>
      </header>
      <Board />
    </div>
  );
}

export default App;
