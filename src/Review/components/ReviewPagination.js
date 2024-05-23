import "../css/ReviewPagination.css";

function ReviewPagination({ page, totalPages, handlePageChange }) {
  const goToPreviousPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };
  return (
    <div className="ReviewPagination">
      <button
        className="page-btn"
        onClick={goToPreviousPage}
        disabled={page === 1}
      >
        이전
      </button>
      <span className="page">
        {page} / {totalPages || 1}{" "}
      </span>
      <button
        className="page-btn"
        onClick={goToNextPage}
        disabled={page === totalPages}
      >
        다음
      </button>
    </div>
  );
}

export default ReviewPagination;
