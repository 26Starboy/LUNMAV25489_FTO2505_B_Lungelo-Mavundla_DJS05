import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeCard from './EpisodeCard.jsx';
import SeasonSelector from './SeasonSelector.jsx';
import formatDate from '../utils/formatDate.js';

/**
 * Show detail component that fetches and displays details for a specific podcast show.
 * Handles loading, error, season navigation, and theme toggling based on route parameters.
 * @returns {JSX.Element} The rendered show detail page.
 */
function ShowDetail() {
  const { id } = useParams(); // Extract show ID from URL
  const [show, setShow] = useState(null); // Store fetched show data
  const [genreData, setGenreData] = useState(null); // Store genre details
  const [loading, setLoading] = useState(true); // Track loading status
  const [error, setError] = useState(null); // Handle fetch errors
  const [currentSeason, setCurrentSeason] = useState(1); // Track selected season
  const [isDarkMode, setIsDarkMode] = useState(true); // Manage dark mode state

  // Map genre titles to IDs, normalized for case sensitivity
  const titleToIdMap = {
    'personal growth': 1,
    'investigative journalism': 2,
    'history': 3,
    'comedy': 4,
    'entertainment': 5,
    'business': 6,
    'fiction': 7,
    'news': 8,
    'kids and family': 9
  };

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`) // Fetch show details
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
        setCurrentSeason(data.seasons[0]?.season || 1); // Set default season

        if (data.genres && data.genres.length > 0) {
          const firstGenreTitle = data.genres[0].toLowerCase(); // Normalize case
          const genreId = titleToIdMap[firstGenreTitle]; // Map to ID
          if (genreId) {
            fetch(`https://podcast-api.netlify.app/genre/${genreId}`) // Fetch genre data
              .then((res) => res.json())
              .then((genreDetails) => {
                setGenreData(genreDetails); // Store genre info
              })
              .catch((err) => {
                console.log('Genre fetch failed:', err); // Log for debugging
                setGenreData({ title: 'Unknown Genre', description: 'No details available.' }); // Fallback
              });
          }
        }
        setLoading(false); // End loading
      })
      .catch((err) => {
        setError('Failed to load show details.'); // Handle show fetch errors
        setLoading(false);
      });
  }, [id]); // Re-run on ID change

  if (loading) return <div className={`loading ${isDarkMode ? 'dark' : 'light'}`}>Loading...</div>;
  if (error) return <div className={`error ${isDarkMode ? 'dark' : 'light'}`}>{error}</div>;
  if (!show) return <div className={`error ${isDarkMode ? 'dark' : 'light'}`}>Show not found.</div>;

  const selectedSeason = show.seasons.find((s) => s.season === currentSeason); // Get current season
  const totalEpisodes = show.seasons.reduce((sum, s) => sum + s.episodes.length, 0); // Total episodes

  return (
    <div className={`show-detail ${isDarkMode ? 'dark' : 'light'}`}>
      <button onClick={() => setIsDarkMode(!isDarkMode)} className="theme-toggle">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <div className="show-header">
        <img src={show.image} alt={show.title} className="show-image" />
        <div className="show-info">
          <h1>{show.title}</h1>
          <p>{show.description}</p>
          <div className="genres">
            {show.genres.map((genre, index) => (
              <span key={`${index}-${genre}`} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
          <p>Last Updated: {formatDate(show.updated)}</p>
          <p>Total Seasons: {show.seasons.length}</p>
          <p>Total Episodes: {totalEpisodes}</p>
          {genreData && (
            <div className="genre-details">
              <h3>Genre Spotlight: {genreData.title}</h3>
              <p>{genreData.description || 'No additional details available.'}</p>
            </div>
          )}
        </div>
      </div>
      <SeasonSelector
        seasons={show.seasons}
        currentSeason={currentSeason}
        onSeasonChange={setCurrentSeason}
      />
      {selectedSeason && (
        <div className="season-section">
          <h2>{selectedSeason.title} ({selectedSeason.episodes.length} Episodes)</h2>
          <div className="episode-list">
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

export default ShowDetail;