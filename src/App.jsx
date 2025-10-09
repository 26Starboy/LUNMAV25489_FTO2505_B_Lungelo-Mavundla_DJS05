import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import ShowDetail from './components/ShowDetail.jsx';

/**
 * Main application component.
 * Sets up routing for the podcast app:
 * - "/" renders HomePage
 * - "/shows/:id" renders ShowDetail
 */
function App() {
  return (
    <Router>
      <div className="App">
        {/* App header */}
        <header className="App-header">
          <h1>Podcast App</h1>
        </header>

        {/* Define routes for HomePage and ShowDetail */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
