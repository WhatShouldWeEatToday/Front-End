import React from "react";
import '../css/Pagination.css';

const Pagination = ({ page, totalPages, handlePageChange }) => {
    const goToPreviousPage = () => {
        if(page > 1){
            handlePageChange(page - 1);
        }
    };

    const goToNextPage = () => {
        if(page < totalPages){
            handlePageChange(page + 1);
        }
    };


    return (
        <div className="pagination">
            <button className="page-btn" onClick={goToPreviousPage} disabled={page === 1}>이전</button>
            <span className="page">{page} / {totalPages} </span>
            <button className="page-btn" onClick={goToNextPage} disabled={page === totalPages}>다음</button>
        </div>
    )
}

export default Pagination;
