import React from 'react';

/**
 * EpisodeCard component.
 * Shows episode number, title, short description, and season image.
 */
function EpisodeCard({ episode, seasonImage }) {
  return (
    <div className="episode-card">
      <img src={seasonImage} alt="Season" className="episode-image" />
      <h4>Episode {episode.episode}: {episode.title}</h4>
      <p>{episode.description.slice(0, 150)}...</p>
    </div>
  );
}

export default EpisodeCard;
