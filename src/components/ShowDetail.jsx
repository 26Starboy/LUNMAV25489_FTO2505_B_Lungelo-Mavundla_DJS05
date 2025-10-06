import React, { useEffect, useState } from 'react'; // Import React hooks for state and side effects
import { useParams } from 'react-router-dom'; // Extract dynamic ID from the URL
import EpisodeCard from './EpisodeCard.jsx'; // Component to render individual episode cards
import SeasonSelector from './SeasonSelector.jsx'; // Component for season navigation
import formatDate from '../utils/formatDate.js'; // Utility to format the last updated date

/**
 * Show detail component that fetches and displays details for a specific podcast show.
 * Handles loading, error states, season navigation, and theme toggling based on route parameters,
 * including genre details from all required APIs.
 * @returns {JSX.Element} The rendered show detail page.
 */
function ShowDetail() {
  const { id } = useParams(); // Extract the show ID from the URL for dynamic data fetching
  const [show, setShow] = useState(null); // State to hold the fetched show data
  const [genreData, setGenreData] = useState(null); // State to hold genre-specific details
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle fetch errors
  const [currentSeason, setCurrentSeason] = useState(1); // State to track the selected season
  const [isDarkMode, setIsDarkMode] = useState(true); // State to manage dark/light mode

  // Mapping of genre titles to their corresponding IDs as specified by the API
  const titleToIdMap = {
    'Personal Growth': 1,
    'Investigative Journalism': 2,
    'History': 3,
    'Comedy': 4,
    'Entertainment': 5,
    'Business': 6,
    'Fiction': 7,
    'News': 8,
    'Kids and Family': 9
  };

  // Effect hook to fetch data when the component mounts or the ID changes
  useEffect(() => {
    // Fetch show details using the ID endpoint
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json()) // Parse the JSON response
      .then((data) => {
        setShow(data); // Store the show data including seasons and episodes
        setCurrentSeason(data.seasons[0]?.season || 1); // Set the default season, with fallback

        // Fetch genre details if genres are available
        if (data.genres && data.genres.length > 0) {
          const firstGenreTitle = data.genres[0]; // Use the first genre title
          const genreId = titleToIdMap[firstGenreTitle]; // Map to the corresponding genre ID
          if (genreId) {
            fetch(`https://podcast-api.netlify.app/genre/${genreId}`) // Fetch genre data
              .then((res) => res.json())
              .then((genreDetails) => {
                setGenreData(genreDetails); // Store the genre details
              })
              .catch((err) => {
                console.log('Failed to load genre details:', err); // Log error for debugging
                setGenreData({ title: 'Unknown Genre', description: 'No details available.' }); // Fallback data
              });
          }
        }
        setLoading(false); // Mark loading as complete
      })
      .catch((err) => {
        setError('Failed to load show details.'); // Set error message on failure
        setLoading(false); // Stop loading on error
      });
  }, [id]); // Dependency on ID ensures re-fetch when route changes

  // Function to toggle between dark and light modes
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Flip the dark mode state
    // Apply theme to body for global effect
    if (!isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  };

  // Render loading state while data is being fetched
  if (loading) return <div className="loading">Loading...</div>;
  // Render error message if the fetch fails
  if (error) return <div className="error">{error}</div>;
  // Render "not found" if no show data is available
  if (!show) return <div className="error">Show not found.</div>;

  // Find the currently selected season based on the state
  const selectedSeason = show.seasons.find((s) => s.season === currentSeason);
  // Calculate the total number of episodes across all seasons
  const totalEpisodes = show.seasons.reduce((sum, s) => sum + s.episodes.length, 0);

  return (
    <div className={`show-detail ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Theme toggle button with animated light bulb icon */}
      <button onClick={toggleDarkMode} className="theme-toggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V4M12 20V21M3 12H4M20 12H21M18.364 5.636L17.657 6.343M6.343 17.657L5.636 18.364M18.364 18.364L17.657 17.657M6.343 6.343L5.636 5.636M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8ZM12 8C9.23858 8 7 10.2386 7 13C7 16.7614 9.23858 19 12 19C14.7614 19 17 16.7614 17 13C17 10.2386 14.7614 8 12 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      {/* Main header section with show image and info */}
      <div className="show-header">
        <img src={show.image} alt={show.title} className="show-image" /> {/* Show cover image */}
        <div className="show-info">
          <h1>{show.title}</h1> {/* Display show title */}
          <p>{show.description}</p> {/* Display show description in glassy pill */}
          <div className="genres">
            {/* Map through genres to display each as a glassy pill-shaped tag */}
            {show.genres.map((genre, index) => (
              <span key={`${index}-${genre}`} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
          <p>Last Updated: {formatDate(show.updated)}</p> {/* Formatted update date */}
          <p>Total Seasons: {show.seasons.length}</p> {/* Total number of seasons */}
          <p>Total Episodes: {totalEpisodes}</p> {/* Total number of episodes */}
          {/* Conditionally render genre details if available */}
          {genreData && (
            <div className="genre-details">
              <h3>Genre Spotlight: {genreData.title}</h3>
              <p>{genreData.description || 'No additional genre details available.'}</p>
            </div>
          )}
        </div>
      </div>
      {/* Season selector for navigation between seasons */}
      <SeasonSelector
        seasons={show.seasons}
        currentSeason={currentSeason}
        onSeasonChange={setCurrentSeason}
      />
      {/* Render season section if a season is selected */}
      {selectedSeason && (
        <div className="season-section">
          <h2>{selectedSeason.title} ({selectedSeason.episodes.length} Episodes)</h2>
          <div className="episode-list">
            {/* Map through episodes to display each card */}
            {selectedSeason.episodes.map((episode) => (
              <EpisodeCard
                key={episode.episode}
                episode={episode}
                seasonImage={selectedSeason.image}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowDetail; // Export the component for use in App.jsx