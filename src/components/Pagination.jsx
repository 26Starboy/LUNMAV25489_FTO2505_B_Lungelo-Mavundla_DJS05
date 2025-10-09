import React from 'react';

/**
 * Numbered Pagination component
 * @param {number} currentPage - currently active page
 * @param {number} totalPages - total number of pages
 * @param {Function} onPageChange - callback when a page is clicked
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // hide if only 1 page

  // create array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-controls">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`pagination-btn ${number === currentPage ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
