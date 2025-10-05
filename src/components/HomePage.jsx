import React, { useEffect, useState } from 'react'; // Import React and React hooks for state and side effects
import { useSearchParams, Link } from 'react-router-dom'; // Import URL parameter management and navigation link from React Router
import ShowCard from './ShowCard.jsx'; // Import ShowCard component for displaying individual podcast show cards
import genreMap from '../utils/genreMap.js'; // Import genre map for converting genre IDs to readable names

/**
 * Homepage component displaying a list of podcast shows with search and genre filtering.
 * Preserves state using URL search params for smooth navigation.
 * @returns {JSX.Element} The rendered homepage.
 */
function HomePage() {
  // State variable to store all fetched shows
  const [shows, setShows] = useState([]);
  // State variable to manage loading state
  const [loading, setLoading] = useState(true);
  // State variable to handle and display errors
  const [error, setError] = useState(null);
  // Hook to read and update URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract search and genre values from the URL or default to empty strings
  const searchQuery = searchParams.get('search') || '';
  const genreId = searchParams.get('genre') || '';

  // Fetch podcast shows from the API once when the component mounts
  useEffect(() => {
    fetch('https://podcast-api.netlify.app') // Fetch data from API
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => {
        setShows(data); // Store fetched shows in state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError('Failed to load shows.'); // Set error message if fetching fails
        setLoading(false); // Stop loading on error
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to handle search input changes and update the URL parameters
  const handleSearchChange = (e) => {
    setSearchParams({ search: e.target.value, genre: genreId });
  };

  // Function to handle genre dropdown selection and update the URL parameters
  const handleGenreChange = (e) => {
    setSearchParams({ search: searchQuery, genre: e.target.value });
  };

  // Filter shows based on the search query and selected genre
  const filteredShows = shows.filter((show) => {
    // Check if search matches title or description
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.description.toLowerCase().includes(searchQuery.toLowerCase());
    // Check if the selected genre matches (or show all if no genre selected)
    const matchesGenre = genreId ? show.genres.includes(parseInt(genreId)) : true;
    return matchesSearch && matchesGenre; // Return only shows that match both filters
  });

  // Show loading message while data is being fetched
  if (loading) return <div className="loading">Loading...</div>;

  // Show error message if API call failed
  if (error) return <div className="error">{error}</div>;

  // Render the homepage content
  return (
    <div className="homepage">
      {/* Filter section with search bar and genre dropdown */}
      <div className="filters">
        {/* Search input field to filter shows by title or description */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* Dropdown menu to select show genre */}
        <select value={genreId} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {/* Dynamically generate genre options using genreMap */}
          {Object.entries(genreMap).map(([id, title]) => (
            <option key={id} value={id}>{title}</option>
          ))}
        </select>
      </div>

      {/* Display filtered list of podcast shows */}
      <div className="show-list">
        {/* Display message if no shows match the filters */}
        {filteredShows.length === 0 ? (
          <p>No shows found.</p>
        ) : (
          // Map through filtered shows and display each inside a clickable link
          filteredShows.map((show) => (
            <Link key={show.id} to={`/shows/${show.id}`}>
              <ShowCard show={show} /> {/* Render individual show card */}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage; // Export HomePage component for use in routing and other parts of the app
