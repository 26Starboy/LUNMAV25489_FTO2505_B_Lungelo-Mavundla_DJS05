import React from 'react'; // Importing React to enable JSX and React component functionality

/**
 * Component to display a single episode card.
 * @param {Object} props - Component props.
 * @param {Object} props.episode - The episode data including episode number, title, and description.
 * @param {string} props.seasonImage - The image URL for the season.
 * @returns {JSX.Element} The rendered episode card.
 */
function EpisodeCard({ episode, seasonImage }) {
  // The EpisodeCard functional component takes in props: 'episode' and 'seasonImage'
  return (
    // The main container for each episode card
    <div className="episode-card">
      {/* Displaying the season image at the top of the episode card */}
      <img src={seasonImage} alt="Season Image" className="episode-image" />

      {/* Container holding episode information such as title and description */}
      <div className="episode-info">
        {/* Displaying episode number and title */}
        <h4>Episode {episode.episode}: {episode.title}</h4>

        {/* Displaying a short version of the episode description (first 150 characters) */}
        <p>{episode.description.slice(0, 150)}...</p>
      </div>
    </div>
  );
}

export default EpisodeCard; // Exporting the EpisodeCard component for use in other parts of the app
