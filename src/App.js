import React, { useState } from 'react';
import logo from './KanbanLogo.svg';
import './App.css';

function App() {
  // Define initial state for boards, lists, and cards
  const [boards, setBoards] = useState([
    { id: 1, title: 'To Do', lists: [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' }
    ] },
    { id: 2, title: 'In Progress', lists: [
      { id: 3, title: 'Task 3' }
    ] },
    { id: 3, title: 'Done', lists: [
      { id: 4, title: 'Task 4' }
    ] }
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} alt="KanbanLogo" className="App-logo" />
        </div>
        <nav className="App-nav">
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#press">Press</a></li>
            <li><a href="#login" className="login">Login</a></li>
            <li><a href="#signup" className="signup">Signup</a></li>
          </ul>
          <div className="divider-line"></div>
        </nav>
      </header>
      <main className="App-main">
        {boards.map(board => (
          <div key={board.id} className="board">
            <h2>{board.title}</h2>
            <div className="lists">
              {board.lists.map(list => (
                <div key={list.id} className="list">
                  <h3>{list.title}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Your Website Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Define a class for tasks
class Task {
  constructor(name, description, status) {
    this.name = name;
    this.description = description;
    this.status = status; // Can be "To Do", "In Progress", or "Done"
  }
}

// Define a class for the project
class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  // Method to add a new task to the project
  addTask(name, description) {
    const task = new Task(name, description, "To Do");
    this.tasks.push(task);
  }

  // Method to move a task to the next status
  moveTask(taskName) {
    const taskIndex = this.tasks.findIndex(task => task.name === taskName);
    if (taskIndex !== -1) {
      const task = this.tasks[taskIndex];
      if (task.status === "To Do") {
        task.status = "In Progress";
      } else if (task.status === "In Progress") {
        task.status = "Done";
      }
    }
  }

  // Method to display all tasks in the project
  displayTasks() {
    console.log(`Tasks for project "${this.name}":`);
    this.tasks.forEach(task => {
      console.log(`- ${task.name}: ${task.description} [${task.status}]`);
    });
  }
}

// Create a new project
const myProject = new Project("My Lean Project");

// Add tasks to the project
myProject.addTask("Task 1", "Implement feature A");
myProject.addTask("Task 2", "Write documentation");
myProject.addTask("Task 3", "Test the application");

// Move a task to the next status
myProject.moveTask("Task 1");

// Display all tasks
myProject.displayTasks();


export default App;
