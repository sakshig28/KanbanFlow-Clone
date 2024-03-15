import React from 'react';
import Board from './components/Board';
import './App.css';
import Auth  from './components/auth';
import Register from './components/register';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/*
const navigate = useNavigate();
function handleNewPageClick() {
  navigate('/whitelist');
}
*/

function LandingPage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Chutes And Ladders</h1>
        <br />
        <Auth />
      </header>
      <body>
        <br />
        Welcome to Chutes and Ladders!
        <br />
        <br />
        Please sign in above to gain access to your saved boards or click on Trello App to use it in your browser!
      </body>
    </div>
  );
}

function RegistrationPage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Chutes And Ladders</h1>
        <br />
        <Register />
      </header>
    </div>
  );
}

function TrelloApp() {
  return(
    <div className="App">
    <header className="App-header">
      <h1 className="App-title">Chutes And Ladders</h1>
    </header>
    <Board />
    </div>
  );
}

function App() {
  return(
    <Router>
      <div>
        <Link to ="/" > Landing Page </Link>
        <br />
        <Link to ="/registration">Registration</Link>
        <br />
        <Link to ="/trello">Trello App</Link>
      </div>

      <Routes>
        <Route path ="/" element = {<LandingPage />} />

        <Route path ="/registration" element = {<RegistrationPage />} />

        <Route path ="/trello" element = {<TrelloApp />} />

      </Routes>
    </Router>
  );
  /*return (

      <Auth/>
      <Board />
    </div>
  );*/
}

export default App;