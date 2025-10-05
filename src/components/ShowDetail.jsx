import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeCard from './EpisodeCard.jsx';
import SeasonSelector from './SeasonSelector.jsx';
import formatDate from '../utils/formatDate.js';

/**
 * Show detail component that fetches and displays details for a specific podcast show.
 * Handles loading, error, and season navigation based on route parameters.
 * @returns {JSX.Element} The rendered show detail page.
 */
function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSeason, setCurrentSeason] = useState(1);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
        setCurrentSeason(data.seasons[0]?.season || 1);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load show details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!show) return <div className="error">Show not found.</div>;

  const selectedSeason = show.seasons.find((s) => s.season === currentSeason);
  const totalEpisodes = show.seasons.reduce((sum, s) => sum + s.episodes.length, 0);

  return (
    <div className="show-detail">
      <div className="show-header">
        <img src={show.image} alt={show.title} className="show-image" />
        <div className="show-info">
          <h1>{show.title}</h1>
          <p>{show.description}</p>
          <div className="genres">
            {show.genres.map((genre, index) => (
              <span key={index} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
          <p>Last Updated: {formatDate(show.updated)}</p>
          <p>Total Seasons: {show.seasons.length}</p>
          <p>Total Episodes: {totalEpisodes}</p>
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