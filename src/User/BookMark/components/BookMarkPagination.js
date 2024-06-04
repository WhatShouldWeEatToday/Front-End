import "../css/BookMarkPagination.css";

function BookMarkPagination({ page, totalPages, handlePageChange }) {
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
    <div className="BookMarkPagination">
      <button
        className="bookmark-page-btn"
        onClick={goToPreviousPage}
        disabled={page === 1}
      >
        이전
      </button>
      <span className="bookmark-page-text">
        {page} / {totalPages || 1}{" "}
      </span>
      <button
        className="bookmark-page-btn"
        onClick={goToNextPage}
        disabled={page === totalPages}
      >
        다음
      </button>
    </div>
  );
}

export default BookMarkPagination;
