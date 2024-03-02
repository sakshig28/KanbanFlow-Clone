import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/hello" element={<HelloWorld />} />
        </Routes>
      </Router>
     
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


