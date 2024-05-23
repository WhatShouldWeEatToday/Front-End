import Header from "../etc/components/Header";
import "./css/ReviewPage.css";
import axios from "../etc/utils/apis";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReviewPagination from "./components/ReviewPagination";

function ReviewPage() {
  const navigate = useNavigate();

  // 각 식당의 리뷰 목록 표시 상태를 관리하기 위한 상태 변수
  // 기본값으로 모든 식당의 리뷰 목록은 닫혀있는 상태(false)
  const [openReviews, setOpenReviews] = useState({});

  // 식당, 리뷰리스트 저장 변수
  const [restaurantList, setRestaurantList] = useState({});
  const [reviewList, setReviewList] = useState({});

  /* Pagination */
  const [page, setPage] = useState(1); // 페이지 숫자
  const [totalPages, setTotalPages] = useState(0); // 전체 데이터 수
  const maxContent = 10; // 한 페이지에 보여줄 식당의 최대 개수

  // 주소 변수
  const [address, setAddress] = useState("");

  // 페이지 변경
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddressChange = (e) => {
    const selectedAddress = e.target.value;
    setAddress(selectedAddress);
    setPage(1);
    if (selectedAddress) {
      getRestaurantsByAddress(selectedAddress);
    } else {
      getRestaurants(); // 아무것도 선택되지 않은 경우 모든 식당 정보 가져옴
    }
  };

  // 리뷰리스트 토글
  const toggleReviews = (id) => {
    setOpenReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const goEditPage = (restaurantId, reviewId) => {
    navigate(`/restaurant/${restaurantId}/review/edit/${reviewId}`);
  };

  const goRestaurantDetailPage = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}/review`);
  };

  const deleteReview = async (reviewId) => {
    axios
      .delete(`http://localhost:8080/api/review/${reviewId}`)
      .then((res) => {
        console.log(res.data);
        alert("리뷰가 삭제되었습니다.");
        // navigate(`/`);
        // navigate('/', { replace: true }); // 현재 페이지 새로고침
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // findAll
  const getRestaurants = async () => {
    axios
      // size(한 페이지에 보여줄 식당의 최대 개수)
      .get(
        `http://localhost:8080/review/findAll?page=${
          page - 1
        }&size=${maxContent}`
      )
      .then((res) => {
        // console.log(res.data);
        const { totalPages } = res.data;
        setTotalPages(totalPages);
        setRestaurantList(res.data);
        const updatedReviewList = res.data.content.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
          reviewList: restaurant.reviewList,
        }));
        setReviewList(updatedReviewList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // findAllByAddress
  const getRestaurantsByAddress = async (address) => {
    axios
      .get(
        `http://localhost:8080/review/findAll?address=${address}&page=${
          page - 1
        }&size=${maxContent}`
      )
      .then((res) => {
        // console.log(res.data);
        const { totalPages } = res.data;
        setTotalPages(totalPages);
        setRestaurantList(res.data);
        const updatedReviewList = res.data.content.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
          reviewList: restaurant.reviewList,
        }));
        setReviewList(updatedReviewList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (address) {
      getRestaurantsByAddress(address);
    } else {
      getRestaurants();
    }
  }, [page, address]); // 페이지 또는 주소가 변경될 때마다 실행

  return (
    <div className="ReviewPage">
      <Header />
      <div className="restaurant-review-container">
        <div className="restaurant-sort-box">
          <select
            className="address-select-box"
            name="address"
            id="address"
            onChange={handleAddressChange}
          >
            <option value="">동/읍/면</option>
            <option value="선산읍">선산읍</option>
            <option value="고아읍">고아읍</option>
            <option value="산동읍">산동읍</option>
            <option value="무을면">무을면</option>
            <option value="옥성면">옥성면</option>
            <option value="도개면">도개면</option>
            <option value="해평면">해평면</option>
            <option value="장천면">장천면</option>
            <option value="송정동">송정동</option>
            <option value="원평동">원평동</option>
            <option value="도량동">도량동</option>
            <option value="선주원남동">선주원남동</option>
            <option value="형곡동">형곡동</option>
            <option value="신평동">신평동</option>
            <option value="비산동">비산동</option>
            <option value="공단동">공단동</option>
            <option value="광평동">광평동</option>
            <option value="상모사곡동">상모사곡동</option>
            <option value="임오동">임오동</option>
            <option value="임은동">임은동</option>
            <option value="오태동">오태동</option>
            <option value="인동동">인동동</option>
            <option value="진미동">진미동</option>
            <option value="양포동">양포동</option>
          </select>
        </div>
        {restaurantList &&
          restaurantList.content &&
          [...restaurantList.content]
            .sort((restaurantA, restaurantB) => {
              // 식당 A와 B의 최신 리뷰 생성일을 찾기
              const latestReviewA = restaurantA.reviewList?.content?.reduce(
                (latest, current) =>
                  new Date(latest.created_Date) > new Date(current.created_Date)
                    ? latest
                    : current,
                // 리뷰가 없는 경우 초기값 = "1900-01-01"
                { created_Date: "1900-01-01" }
              );
              const latestReviewB = restaurantB.reviewList?.content?.reduce(
                (latest, current) =>
                  new Date(latest.created_Date) > new Date(current.created_Date)
                    ? latest
                    : current,
                { created_Date: "1900-01-01" }
              );

              // 최신 리뷰 생성일을 기준으로 내림차순 정렬
              return (
                new Date(latestReviewB.created_Date) -
                new Date(latestReviewA.created_Date)
              );
            })
            .map((restaurant) => (
              <div className="restaurant-details" key={restaurant.id}>
                <div
                  className="restaurant-name"
                  onClick={() => {
                    goRestaurantDetailPage(restaurant.id);
                  }}
                >
                  {restaurant.name}
                </div>
                <button
                  className="toggle-reviews-btn"
                  onClick={() => toggleReviews(restaurant.id)}
                >
                  ▼
                </button>
                <div className="restaurant-address">
                  {restaurant.addressRoad}
                </div>
                <div className="restaurant-tel">{restaurant.tel}</div>
                <div className="star-rating-info">
                  <span className="star-icon">★</span>
                  <span className="star-degree">{restaurant.degree}</span>
                  <span className="total-reviews">
                    ({restaurant.totalReviews})
                  </span>
                </div>
                {/* 식당 리뷰 정보 */}
                {openReviews[restaurant.id] &&
                  restaurant.reviewList &&
                  restaurant.reviewList.content && (
                    <div className="review-list">
                      {restaurant.reviewList &&
                        restaurant.reviewList.content &&
                        restaurant.reviewList.content
                          .sort(
                            (a, b) =>
                              new Date(b.created_Date) -
                              new Date(a.created_Date)
                          )
                          .map((review) => (
                            <div className="review-info-box" key={review.id}>
                              <div className="review-details">
                                <img
                                  src={
                                    process.env.PUBLIC_URL + "/img/account.png"
                                  }
                                  width="50px"
                                  height="50px"
                                  alt="account-img"
                                />
                                <span className="review-writers">
                                  {review.writers}
                                </span>
                                <span className="review-createdDate">
                                  {review.created_Date}
                                </span>
                                <img
                                  src={process.env.PUBLIC_URL + "/img/like.png"}
                                  width="23px"
                                  height="30px"
                                  alt="like-img"
                                />
                                <span className="review-totalLikes">
                                  {review.totalLikes}
                                </span>
                                {/* 임시로 Not Null로 해둠 */}
                                {review.reviewType !== null && (
                                  <img
                                    className="verified-img"
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/img/Verified.png"
                                    }
                                    width="27px"
                                    height="27px"
                                    alt="verified-img"
                                  />
                                )}
                                <button
                                  className="review-edit-btn"
                                  title="수정"
                                  onClick={() => {
                                    goEditPage(restaurant.id, review.id);
                                  }}
                                >
                                  <img
                                    src={
                                      process.env.PUBLIC_URL + "/img/Edit.png"
                                    }
                                    width="25px"
                                    height="25px"
                                    alt="edit-img"
                                  />
                                </button>
                                <button
                                  className="review-delete-btn"
                                  title="삭제"
                                  onClick={() => {
                                    deleteReview(review.id);
                                  }}
                                >
                                  <img
                                    src={
                                      process.env.PUBLIC_URL + "/img/Delete.png"
                                    }
                                    width="25px"
                                    height="25px"
                                    alt="delete-img"
                                  />
                                </button>
                              </div>
                              <div className="review-star-tags">
                                <span className="star-icon2">★</span>
                                <span className="review-star-rating">
                                  {review.stars}
                                </span>
                                <img
                                  className="thumbUp-img"
                                  src={
                                    process.env.PUBLIC_URL + "/img/ThumbUp.png"
                                  }
                                  width="32px"
                                  height="32px"
                                  alt="thumbUp-img"
                                />
                                {review.taste === 1 && (
                                  <div className="taste-tag">맛</div>
                                )}
                                {review.cost === 1 && (
                                  <div className="cost-tag">가성비</div>
                                )}
                                {review.kind === 1 && (
                                  <div className="kind-tag">친절</div>
                                )}
                                {review.mood === 1 && (
                                  <div className="mood-tag">분위기</div>
                                )}
                                {review.park === 1 && (
                                  <div className="park-tag">주차</div>
                                )}
                              </div>
                            </div>
                          ))}
                    </div>
                  )}
              </div>
            ))}
        <ReviewPagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
export default ReviewPage;
