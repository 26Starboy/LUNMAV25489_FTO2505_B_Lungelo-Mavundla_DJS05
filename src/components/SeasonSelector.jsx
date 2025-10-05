import React from 'react';

/**
 * Component for selecting a season via dropdown.
 * @param {Object} props - Component props.
 * @param {Array} props.seasons - Array of season objects with season number and episode count.
 * @param {number} props.currentSeason - The currently selected season number.
 * @param {Function} props.onSeasonChange - Callback function to handle season change.
 * @returns {JSX.Element} The rendered season selector dropdown.
 */
function SeasonSelector({ seasons, currentSeason, onSeasonChange }) {
  return (
    <div className="season-selector">
      <label>Season: </label>
      <select value={currentSeason} onChange={(e) => onSeasonChange(parseInt(e.target.value))}>
        {seasons.map((season) => (
          <option key={season.season} value={season.season}>
            Season {season.season} ({season.episodes.length} Episodes)
          </option>
        ))}
      </select>
    </div>
  );
}

export default SeasonSelector;