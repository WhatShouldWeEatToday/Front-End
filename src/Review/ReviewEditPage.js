import Header from "../etc/components/Header";
import StarRating from "./components/StarRating";
import "./css/ReviewEditPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../etc/utils/apis";

function ReviewEditPage() {
  const navigate = useNavigate();

  const [restaurantId, setRestaurantId] = useState(1); // 음식점 ID(테스트용)
  const [reviewId, setReviewId] = useState(2); // 리뷰 ID(테스트용)
  const [starRating, setStarRating] = useState(5.0); // 별점 상태

  // 태그(맛, 가성비, 친절, 분위기, 주차)
  const [taste, setTaste] = useState(0);
  const [cost, setCost] = useState(0);
  const [kind, setKind] = useState(0);
  const [mood, setMood] = useState(0);
  const [park, setPark] = useState(0);

  // 별점 변화 감지
  const handleRatingChange = (rating) => {
    setStarRating(rating);
  };

  // 태그 체크박스 변화 감지
  const handleTagChange = (e, setState) => {
    const isChecked = e.target.checked;
    setState(isChecked ? 1 : 0);
  };

  // 리뷰 수정
  const editReview = async () => {
    console.log("ReviewId = " + reviewId);
    console.log("StarRating = " + starRating);
    console.log("Taste = " + taste);
    console.log("Cost = " + cost);
    console.log("Kind = " + kind);
    console.log("Mood = " + mood);
    console.log("Park = " + park);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
    };
    axios
      .patch(
        `http://localhost:8080/api/review/${reviewId}`,
        {
          stars: starRating,
          taste: taste,
          cost: cost,
          kind: kind,
          mood: mood,
          park: park,
        },
        {
          headers: headers, // 헤더 설정
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("리뷰가 수정되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteReview = async () => {
    axios
      .delete(`http://localhost:8080/api/review/${reviewId}`)
      .then((res) => {
        console.log(res.data);
        alert("리뷰가 삭제되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const readReview = async () => {
    axios
      .get(`http://localhost:8080/review/findAll`)
      .then((res) => {
        console.log(res.data);
        alert("리뷰 조회 성공");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ReviewEditPage">
      <Header />
      <div className="review-form-container">
        {/* 음식점 정보 */}
        <div className="restaurant-info">
          <div className="restaurant-name">한솥도시락구미금오공대점</div>
          <div className="restaurant-address">
            경상북도 구미시 대학로 39 (거의동 외 2필지)
          </div>
          <div className="restaurant-tel">054-472-0615</div>
          <div className="star-rating-info">
            <span className="star-icon">★</span>
            <span className="star-degree">5.0</span>
            <span className="total-reviews">(12)</span>
            <button className="favorites-btn">즐겨찾기</button>
          </div>
        </div>
        <StarRating onRatingChange={handleRatingChange} />
        <div className="review-tag-box">
          <div className="your-choice">어떤 점이 마음에 드셨나요?</div>
          <div className="review-input-box">
            <input
              type="checkbox"
              name="review-tags"
              id="taste"
              onChange={(e) => handleTagChange(e, setTaste)}
            />
            <label className="review-tag-name" htmlFor="taste">
              맛
            </label>
            <input
              type="checkbox"
              name="review-tags"
              id="cost"
              onChange={(e) => handleTagChange(e, setCost)}
            />
            <label className="review-tag-name" htmlFor="cost">
              가성비
            </label>
            <input
              type="checkbox"
              name="review-tags"
              id="kind"
              onChange={(e) => handleTagChange(e, setKind)}
            />
            <label className="review-tag-name" htmlFor="kind">
              친절
            </label>
            <input
              type="checkbox"
              name="review-tags"
              id="mood"
              onChange={(e) => handleTagChange(e, setMood)}
            />
            <label className="review-tag-name" htmlFor="mood">
              분위기
            </label>
            <input
              type="checkbox"
              name="review-tags"
              id="park"
              onChange={(e) => handleTagChange(e, setPark)}
            />
            <label className="review-tag-name" htmlFor="park">
              주차
            </label>
          </div>
        </div>
        <button className="edit-btn" onClick={editReview}>
          수정하기
        </button>
        <button className="delete-btn" onClick={deleteReview}>
          삭제하기
        </button>
        <button className="read-btn" onClick={readReview}>
          조회하기
        </button>
      </div>
    </div>
  );
}

export default ReviewEditPage;
