import React from 'react'; // Importing React to enable JSX and functional components
import genreMap from '../utils/genreMap.js'; // Import genreMap utility to convert genre IDs into readable genre names
import formatDate from '../utils/formatDate.js'; // Import formatDate utility to format the updated date

/**
 * Component to display a single show card on the homepage.
 * @param {Object} props - Component props.
 * @param {Object} props.show - The show data including title, image, description, genres, and updated date.
 * @returns {JSX.Element} The rendered show card.
 */
function ShowCard({ show }) {
  // The ShowCard component receives a single show object as a prop and displays its details
  return (
    // Main container for each show card
    <div className="show-card">
      {/* Display the show's image */}
      <img src={show.image} alt={show.title} />

      {/* Display the show's title */}
      <h3>{show.title}</h3>

      {/* Display a short preview of the show's description (first 100 characters) */}
      <p>{show.description.slice(0, 100)}...</p>

      {/* Container for displaying genre tags */}
      <div className="genres">
        {/* Map through each genre ID and display its name using genreMap utility */}
        {show.genres.map((id) => (
          <span key={id} className="genre-tag">{genreMap[id] || 'Unknown'}</span>
        ))}
      </div>

      {/* Display the total number of seasons the show has */}
      <p>Seasons: {show.seasons.length}</p>

      {/* Display the last updated date of the show using the formatDate utility */}
      <p>Updated: {formatDate(show.updated)}</p>
    </div>
  );
}

export default ShowCard; // Exporting ShowCard for use in other components like HomePage
