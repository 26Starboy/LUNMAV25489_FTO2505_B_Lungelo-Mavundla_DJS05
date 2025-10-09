import React from 'react';

/**
 * SeasonSelector component.
 * Dropdown for switching between seasons.
 */
function SeasonSelector({ seasons, currentSeason, onSeasonChange }) {
  return (
    <div className="season-selector">
      <label>Current Season: </label>
      <select
        value={currentSeason}
        onChange={(e) => onSeasonChange(parseInt(e.target.value))}
      >
        {seasons.map((season) => (
          <option key={season.season} value={season.season}>
            {season.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SeasonSelector;
