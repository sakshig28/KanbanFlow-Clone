import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';
import Auth  from './components/auth';
import BoardSelection from './components/BoardSelection';

function App() {
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleSelectBoard = (board) => {
    setSelectedBoard(board);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Chutes And Ladders</h1>
      </header>
      <Auth/>
      <BoardSelection onSelectBoard={handleSelectBoard} />
      {selectedBoard && <Board boardID={selectedBoard.id} />}
    </div>
  );
}

export default App;