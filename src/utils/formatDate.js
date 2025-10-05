/**
 * Formats an ISO date string into a human-readable format (e.g., January 15, 2025).
 * @param {string} isoDate - The ISO date string to format.
 * @returns {string} The formatted date string.
 */
function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default formatDate;