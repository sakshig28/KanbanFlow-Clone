<<<<<<< HEAD
import React from "react";
import Board from "./components/Board";
import "./App.css";
import { Auth } from "./components/auth";
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Board from './components/Board';
import './App.css';
import Auth  from './components/auth';
>>>>>>> d40e3545e8619a9e94666daa8ca5e5863a94236d

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/hello" element={<HelloWorld />} />
        </Routes>
      </Router>
     
=======
      <header className="App-header">
        <h1 className="App-title">Chutes And Ladders</h1>
      </header>
      <Auth />
      <Board />
>>>>>>> 28a66a4e2cbee4afda44baf161f7da7672f2f6a3
    </div>
  );
}

const fetchit = () => {
  fetch("/api/hello")
  .then(res => res.json())
  .then(json => console.log(json));
}

useEffect(() => {
  fetchit();
}, [])

export default App;


