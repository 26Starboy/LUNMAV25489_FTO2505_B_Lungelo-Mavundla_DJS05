/**
 * Formats an ISO date string to a readable format (e.g., January 15, 2025).
 * @param {string} isoDate - The ISO date string.
 * @returns {string} The formatted date.
 */
function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default formatDate;