import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import ShowDetail from './components/ShowDetail.jsx';

/**
 * Main application component that sets up routing for the podcast app.
 * @returns {JSX.Element} The rendered application with routing.
 */
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Podcast App</h1>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;