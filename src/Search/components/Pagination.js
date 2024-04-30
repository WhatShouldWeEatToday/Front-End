import React from "react";
import '../css/Pagination.css';

const Pagination = ({ page, totalPages, handlePageChange }) => {
    const goToPreviousPage = () => {
        if(page > 0){
            handlePageChange(page - 1);
        }
    };

    const goToNextPage = () => {
        if(page < totalPages - 1){
            handlePageChange(page + 1);
        }
    };


    return (
        <div className="pagination">
            <button className="page-btn" onClick={goToPreviousPage} disabled={page === 0}>이전</button>
            <span className="page">{page + 1} / {totalPages} </span>
            <button className="page-btn" onClick={goToNextPage} disabled={page === totalPages - 1}>이전</button>
        </div>
    )
}



export default Pagination;