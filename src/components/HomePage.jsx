import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ShowCard from './ShowCard.jsx';
import genreMap from '../utils/genreMap.js';

/**
 * Homepage component displaying a list of podcast shows with search and genre filtering.
 * Preserves state using URL search params for smooth navigation.
 * @returns {JSX.Element} The rendered homepage.
 */
function HomePage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const genreId = searchParams.get('genre') || '';

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
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
    setSearchParams({ search: e.target.value, genre: genreId });
  };

  const handleGenreChange = (e) => {
    setSearchParams({ search: searchQuery, genre: e.target.value });
  };

  const filteredShows = shows.filter((show) => {
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = genreId ? show.genres.includes(parseInt(genreId)) : true;
    return matchesSearch && matchesGenre;
  });

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="homepage">
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