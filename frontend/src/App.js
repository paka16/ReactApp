// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Nav';
import './App.css';
// import Image from "./image.js";

// Import Pages
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';

// Define the function that renders the content in routes using State.
function App() {

  const [exercise, setExercise] = useState([]);

  return (
    <>
      <Router>

          <header>
            <h1>Exercise Progress Report</h1>
            <p>This app uses MERN to create a log journal of your exercises.</p>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact>
              {/* <Image/> */}
              <HomePage setExercise={setExercise} />
            </Route>

            <Route path="/create-exercise">
              <CreateExercisePage />
            </Route>
            
            <Route path="/edit-exercise">
              <EditExercisePage exercise={exercise} />
            </Route>
          </main>

          <footer>
            <p>Portfolio Project &copy; 2022 Ashley Pak </p>
          </footer>

      </Router>
    </>
  );
}


export default App;