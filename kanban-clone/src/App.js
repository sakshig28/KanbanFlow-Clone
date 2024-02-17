import logo from './KanbanLogo.svg'
import './App.css';

let myvar = 0
function myClickHandler(){
  console.log(myvar)
}

function App() {
  return (
    <div className="App">
      <body>
      <header>
        <div className="svg-container">
        <img src={logo} alt="KanbanLogo"></img>
        </div>
    </header>
    <nav>
        <div className="divider-line"></div>
        <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#" className="login">Login</a></li> 
            <li><a href="#" className="signup">Signup</a></li> 

        </ul>
    </nav>
    <main>
        <h1 className="heading">LEAN PROJECT MANAGEMENT. <span className="underline">SIMPLIFIED</span>.</h1>
        <button onClick={myClickHandler}>Hi i'm a Button</button>
        <h3 className="subheading">Boost your personal or team productivity</h3>
    </main>
    <footer>
        <p>&copy; 2024 Your Website Name. All rights reserved.</p>
    </footer>
    </body>
    </div>
    
  );
}

export default App;
