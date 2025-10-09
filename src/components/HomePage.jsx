import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import ShowCard from './ShowCard.jsx';
import genreMap from '../utils/genreMap.js';
import Pagination from './Pagination.jsx';

function HomePage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 8; // 8 shows per page

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const genreId = searchParams.get('genre') || '';

  const location = useLocation();

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load shows.');
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchParams({ search: e.target.value, genre: genreId });
    setCurrentPage(1); // reset to page 1 on search
  };

  const handleGenreChange = (e) => {
    setSearchParams({ search: searchQuery, genre: e.target.value });
    setCurrentPage(1); // reset to page 1 on filter
  };

  // Filter shows
  const filteredShows = shows.filter((show) => {
    const matchesSearch =
      show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = genreId ? show.genres.includes(parseInt(genreId)) : true;
    return matchesSearch && matchesGenre;
  });

  // Pagination logic
  const totalPages = 8; // always show 8 pages
  const startIndex = (currentPage - 1) * showsPerPage;
  const endIndex = startIndex + showsPerPage;
  const currentShows = filteredShows.slice(startIndex, endIndex);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="homepage">
      {/* Filters */}
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
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </div>

      {/* Shows */}
      <div className="show-list">
        {currentShows.length === 0 ? (
          <p>No shows found.</p>
        ) : (
          currentShows.map((show) => (
            <Link
              key={show.id}
              to={`/shows/${show.id}`}
              state={{ from: `${location.pathname}?${searchParams.toString()}` }}
            >
              <ShowCard show={show} />
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default HomePage;
