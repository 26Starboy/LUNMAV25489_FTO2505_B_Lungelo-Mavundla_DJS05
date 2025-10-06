import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ShowCard from './ShowCard.jsx';
import genreMap from '../utils/genreMap.js';

/**
 * Homepage component that displays a list of podcast shows with search and genre filtering.
 * Preserves state using URL search params and supports theme toggling.
 * @returns {JSX.Element} The rendered homepage.
 */
function HomePage() {
  const [shows, setShows] = useState([]); // Store fetched show previews
  const [loading, setLoading] = useState(true); // Track loading status
  const [error, setError] = useState(null); // Handle fetch errors
  const [searchParams, setSearchParams] = useSearchParams(); // Manage URL params
  const [isDarkMode, setIsDarkMode] = useState(true); // Manage dark mode state
  const searchQuery = searchParams.get('search') || ''; // Get search term
  const genreId = searchParams.get('genre') || ''; // Get genre filter

  useEffect(() => {
    fetch('https://podcast-api.netlify.app') // Fetch show previews
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load shows.');
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchParams({ search: e.target.value, genre: genreId }); // Update search param
  };

  const handleGenreChange = (e) => {
    setSearchParams({ search: searchQuery, genre: e.target.value }); // Update genre param
  };

  const filteredShows = shows.filter((show) => {
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = genreId ? show.genres.includes(parseInt(genreId)) : true;
    return matchesSearch && matchesGenre;
  });

  if (loading) return <div className={`loading ${isDarkMode ? 'dark' : 'light'}`}>Loading...</div>;
  if (error) return <div className={`error ${isDarkMode ? 'dark' : 'light'}`}>{error}</div>;

  return (
    <div className={`homepage ${isDarkMode ? 'dark' : 'light'}`}>
      <button onClick={() => setIsDarkMode(!isDarkMode)} className="theme-toggle">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={genreId} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {Object.entries(genreMap).map(([id, title]) => (
            <option key={id} value={id}>{title}</option>
          ))}
        </select>
      </div>
      <div className="show-list">
        {filteredShows.length === 0 ? (
          <p>No shows found.</p>
        ) : (
          filteredShows.map((show) => (
            <Link key={show.id} to={`/shows/${show.id}`}>
              <ShowCard show={show} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;