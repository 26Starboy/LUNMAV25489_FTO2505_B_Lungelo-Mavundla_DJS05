import React from 'react';
import genreMap from '../utils/genreMap.js';
import formatDate from '../utils/formatDate.js';

/**
 * Component to display a single show card on the homepage.
 * @param {Object} props - Component props.
 * @param {Object} props.show - The show data including title, image, description, genres, and updated date.
 * @returns {JSX.Element} The rendered show card.
 */
function ShowCard({ show }) {
  return (
    <div className="show-card">
      <img src={show.image} alt={show.title} />
      <h3>{show.title}</h3>
      <p>{show.description.slice(0, 100)}...</p>
      <div className="genres">
        {show.genres.map((id) => (
          <span key={id} className="genre-tag">{genreMap[id] || 'Unknown'}</span>
        ))}
      </div>
      <p>Seasons: {show.seasons.length}</p>
      <p>Updated: {formatDate(show.updated)}</p>
    </div>
  );
}

export default ShowCard;