import React from 'react';

/**
 * Component to display a single episode card.
 * @param {Object} props - Component props.
 * @param {Object} props.episode - The episode data including episode number, title, and description.
 * @param {string} props.seasonImage - The image URL for the season.
 * @returns {JSX.Element} The rendered episode card.
 */
function EpisodeCard({ episode, seasonImage }) {
  return (
    <div className="episode-card">
      <img src={seasonImage} alt="Season Image" className="episode-image" />
      <div className="episode-info">
        <h4>Episode {episode.episode}: {episode.title}</h4>
        <p>{episode.description.slice(0, 150)}...</p>
      </div>
    </div>
  );
}

export default EpisodeCard;