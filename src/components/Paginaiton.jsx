import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePages = () => {
    const pages = [];
    const showRange = 1; // number of pages to show before and after current

    // Always show first page
    if (currentPage > 2) {
      pages.push(1);
    }

    // Add "..." when there's a gap between first and current range
    if (currentPage > 3) {
      pages.push("...");
    }

    // Pages around current
    for (let i = Math.max(1, currentPage - showRange); i <= Math.min(totalPages, currentPage + showRange); i++) {
      pages.push(i);
    }

    // Add "..." before last page
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    if (currentPage < totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pagesToShow = generatePages();

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex gap-1 text-sm">

        {/* Previous */}
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg bg-primary hover:shadow-md text-white/90"
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {pagesToShow.map((page, idx) => (
          <li key={idx}>
            {page === "..." ? (
              <span className="flex items-center border-0 outline-none justify-center px-3 h-8 text-gray-400">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`flex items-center border-none! outline-none! justify-center px-3 h-8
                  ${page === currentPage 
                    ? "bg-primary text-white/90" 
                    : "bg-white hover:bg-gray-100 text-gray-400"}`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg bg-primary hover:shadow-md text-white/90"
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Pagination;
