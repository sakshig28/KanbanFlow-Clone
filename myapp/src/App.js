import React from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Trello Clone</h1>
      </header>
      <Board />
    </div>
  );
}

export default App;
