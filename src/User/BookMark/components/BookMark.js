import "../css/BookMark.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "../../../etc/utils/apis";

function BookMark() {
  const navigate = useNavigate();

  const [bookmarkList, setBookmarkList] = useState({});

  // 해당 식당 정보 페이지 이동
  const goRestaurantDetailPage = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}/review`);
  };

  // 즐겨찾기 조회
  const getBookmarkList = async () => {
    axios
      .get(`http://localhost:8080/restaurant/bookmark`)
      .then((res) => {
        console.log(res.data);
        setBookmarkList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 즐겨찾기 삭제(수정 필요)
  const deleteBookmark = async (restaurantId, bookmarkId) => {
    axios
      .delete(
        `http://localhost:8080/api/restaurant/${restaurantId}/bookmark/${bookmarkId}`
      )
      .then((res) => {
        console.log(res.data);
        alert("즐겨찾기가 삭제되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBookmarkList();
  });

  return (
    <div className="BookMark">
      {bookmarkList &&
        bookmarkList.content &&
        [...bookmarkList.content].map((restaurant, bookmark) => (
          <div className="restaurant-details" key={restaurant.id}>
            <div
              className="restaurant-name"
              onClick={() => {
                goRestaurantDetailPage(restaurant.id);
              }}
            >
              {restaurant.name}
            </div>
            <div className="restaurant-address">{restaurant.addressRoad}</div>
            <div className="restaurant-tel">{restaurant.tel}</div>
            <div className="star-rating-info">
              <span className="star-icon">★</span>
              <span className="star-degree">{restaurant.degree}</span>
              <span className="total-reviews">({restaurant.totalReviews})</span>
              <button
                className="favorites-delete-btn"
                onClick={() => deleteBookmark(restaurant.id, bookmark.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default BookMark;
