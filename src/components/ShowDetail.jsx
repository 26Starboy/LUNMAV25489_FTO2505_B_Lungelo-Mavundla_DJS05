import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import EpisodeCard from './EpisodeCard.jsx';
import SeasonSelector from './SeasonSelector.jsx';
import formatDate from '../utils/formatDate.js';

/**
 * ShowDetail component.
 * Displays details for a specific podcast show,
 * including seasons, episodes, genres, and last updated info.
 * No pagination is included here.
 */
function ShowDetail() {
  const { id } = useParams(); // Get show ID from URL
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSeason, setCurrentSeason] = useState(1);

  // Fetch show details based on ID
  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
        setCurrentSeason(data.seasons[0]?.season || 1);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load show details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!show) return <div className="error">Show not found.</div>;

  const selectedSeason = show.seasons.find((s) => s.season === currentSeason);

  // Handle back button preserving previous filters
  const handleBack = () => {
    if (location.state?.from) navigate(location.state.from);
    else navigate('/');
  };

  return (
    <div className="show-detail">
      {/* Back button */}
      <button className="back-btn" onClick={handleBack}>
        &larr; Back
      </button>

      {/* Show header with image and info */}
      <div className="show-header">
        <img src={show.image} alt={show.title} className="show-image" />
        <div className="show-info">
          <h1>{show.title}</h1>
          <p>{show.description}</p>
          <div className="genres">
            {show.genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
          <p>Last Updated: {formatDate(show.updated)}</p>
          <p>Total Seasons: {show.seasons.length}</p>
          <p>Total Episodes: {show.seasons.reduce((sum, s) => sum + s.episodes.length, 0)}</p>
        </div>
      </div>

      {/* Season selector dropdown */}
      <SeasonSelector
        seasons={show.seasons}
        currentSeason={currentSeason}
        onSeasonChange={setCurrentSeason}
      />

      {/* List of episodes for selected season */}
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
