import "../css/RestaurantInfomodule.css";
import axios from "../../etc/utils/apis";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function RestaurantInfo({ restaurantId }) {
  const navigate = useNavigate();

  const [name, setName] = useState(""); // 음식점 이름
  const [address, setAddress] = useState(""); // 음식점 주소(도로명)
  const [tel, setTel] = useState(""); // 전화번호
  const [degree, setDegree] = useState(0); // 별점
  const [totalReviews, setTotalReviews] = useState(0); // 총 리뷰 개수

  // 태그
  const [totalTaste, setTotalTaste] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalKind, setTotalKind] = useState(0);
  const [totalMood, setTotalMood] = useState(0);
  const [totalPark, setTotalPark] = useState(0);
  const [reviewList, setReviewList] = useState({}); // 리뷰 Object

  useEffect(() => {
    getRestaurantDetails();
  }, [restaurantId, reviewList]);

  const getRestaurantDetails = async () => {
    axios
      .get(`http://localhost:8080/restaurant/${restaurantId}/details`)
      .then((res) => {
        // console.log(res.data);
        setName(res.data.name);
        setAddress(res.data.addressRoad);
        setTel(res.data.tel);
        setDegree(res.data.degree);
        setTotalReviews(res.data.totalReviews);
        setTotalTaste(res.data.totalTaste);
        setTotalCost(res.data.totalCost);
        setTotalKind(res.data.totalKind);
        setTotalMood(res.data.totalMood);
        setTotalPark(res.data.totalPark);
        setReviewList(res.data.reviewList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goEditPage = (reviewId) => {
    navigate(`/restaurant/${restaurantId}/review/edit/${reviewId}`);
  };

  const deleteReview = async (reviewId) => {
    axios
      .delete(`http://localhost:8080/api/review/${reviewId}`)
      .then((res) => {
        console.log(res.data);
        alert("리뷰가 삭제되었습니다.");
        // navigate('/', { replace: true });
        // navigate(`/restaurant/${restaurantId}/review`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goReviewAuthPage = () => {
    navigate(`/restaurant/${restaurantId}/review/receiptAuth`);
  };

  return (
    <div className="RestaurantDetails">
      <div className="restaurant-details">
        <div className="restaurant-name">{name}</div>
        <div className="restaurant-address">{address}</div>
        <div className="restaurant-tel">{tel}</div>
        <div className="star-rating-info">
          <span className="star-icon">★</span>
          <span className="star-degree">{degree}</span>
          <span className="total-reviews">({totalReviews})</span>
          <button className="favorites-btn">즐겨찾기</button>
          <button className="review-register-btn" onClick={goReviewAuthPage}>
            리뷰 쓰기
          </button>
        </div>
      </div>
      <div className="review-star-tags">
        <div className="taste-tag">맛 {totalTaste}</div>
        <div className="cost-tag">가성비 {totalCost}</div>
        <div className="kind-tag">친절 {totalKind}</div>
        <div className="mood-tag">분위기 {totalMood}</div>
        <div className="park-tag">주차 {totalPark}</div>
      </div>
      <div className="review-info-container">
        {reviewList &&
          reviewList.content &&
          reviewList.content
            .sort((a, b) => new Date(b.created_Date) - new Date(a.created_Date))
            .map((review) => (
              <div className="review-info-box" key={review.id}>
                <div className="review-details">
                  <img
                    alt="account-img"
                    src={process.env.PUBLIC_URL + "/img/account.png"}
                    width="50px"
                    height="50px"
                  />
                  <span className="review-writers">{review.writers}</span>
                  <span className="review-createdDate">
                    {review.createdDate}
                  </span>
                  <img
                    alt="like-img"
                    src={process.env.PUBLIC_URL + "/img/like.png"}
                    width="23px"
                    height="30px"
                  />
                  <span className="review-totalLikes">{review.totalLikes}</span>
                  {/* 임시로 Not Null로 해둠 */}
                  {review.reviewType !== null && (
                    <img
                      alt="verified-img"
                      className="verified-img"
                      src={process.env.PUBLIC_URL + "/img/Verified.png"}
                      width="27px"
                      height="27px"
                    />
                  )}
                  <button
                    className="review-edit-btn"
                    title="수정"
                    onClick={() => {
                      goEditPage(review.id);
                    }}
                  >
                    <img
                      alt="edit-img"
                      src={process.env.PUBLIC_URL + "/img/Edit.png"}
                      width="25px"
                      height="25px"
                    />
                  </button>
                  {/* 반드시 화살표 함수 사용해야함 */}
                  <button
                    className="review-delete-btn"
                    title="삭제"
                    onClick={() => {
                      deleteReview(review.id);
                    }}
                  >
                    <img
                      alt="delete-img"
                      src={process.env.PUBLIC_URL + "/img/Delete.png"}
                      width="25px"
                      height="25px"
                    />
                  </button>
                </div>
                <div className="review-star-tags">
                  <span className="star-icon2">★</span>
                  <span className="review-star-rating">{review.stars}</span>
                  <img
                    alt="thumbUp-img"
                    className="thumbUp-img"
                    src={process.env.PUBLIC_URL + "/img/ThumbUp.png"}
                    width="32px"
                    height="32px"
                  />
                  {review.taste === 1 && <div className="taste-tag">맛</div>}
                  {review.cost === 1 && <div className="cost-tag">가성비</div>}
                  {review.kind === 1 && <div className="kind-tag">친절</div>}
                  {review.mood === 1 && <div className="mood-tag">분위기</div>}
                  {review.park === 1 && <div className="park-tag">주차</div>}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
export default RestaurantInfo;
