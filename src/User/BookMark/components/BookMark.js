import "../css/BookMark.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "../../../etc/utils/apis";
import BookMarkPagination from "../components/BookMarkPagination";

function BookMark() {
  const navigate = useNavigate();

  const [bookmarkList, setBookmarkList] = useState([]);

  const [page, setPage] = useState(1); // 페이지 숫자
  const [totalPages, setTotalPages] = useState(0); // 전체 데이터 수

  // 페이지 변경
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // 해당 식당 정보 페이지 이동
  const goRestaurantDetailPage = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}/review`);
  };

  // 즐겨찾기 조회
  const getBookmarkList = async () => {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
    };
    axios
      .get(`http://localhost:8080/restaurant/bookmark?page=${page - 1}`, {
        headers: headers, // 헤더 설정
      })
      .then((res) => {
        console.log(res.data);
        const { totalPages } = res.data;
        setTotalPages(totalPages);
        setBookmarkList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 즐겨찾기 삭제
  const deleteBookmark = async (restaurantId, bookmarkId) => {
    axios
      .delete(
        `http://localhost:8080/api/restaurant/${restaurantId}/bookmark/${bookmarkId}`
      )
      .then((res) => {
        console.log(res.data);
        alert("즐겨찾기에서 삭제되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBookmarkList();
  }, [page]);

  return (
    <div className="BookMark">
      {bookmarkList &&
        bookmarkList.content &&
        [...bookmarkList.content].map((bookmark) => (
          // 식당 정보
          <div className="rest-details" key={bookmark.id}>
            <div
              className="rest-name"
              onClick={() => {
                goRestaurantDetailPage(bookmark.restaurantId);
              }}
            >
              {bookmark.restaurantName}
            </div>
            <div className="rest-address">{bookmark.addressRoad}</div>
            <div className="rest-tel">{bookmark.restaurantTel}</div>
            <div className="star-rating-info">
              <span className="star-icon">★</span>
              <span className="star-degree">{bookmark.degrees}</span>
              <span className="total-reviews">({bookmark.reviews})</span>
              <button
                className="favorites-delete-btn"
                onClick={() =>
                  deleteBookmark(bookmark.restaurantId, bookmark.id)
                }
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      <BookMarkPagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default BookMark;
