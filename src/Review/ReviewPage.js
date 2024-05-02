import Header from "../etc/components/Header";
import "./css/ReviewPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../etc/utils/apis";

function ReviewPage() {
  const navigate = useNavigate();

  const [restaurantId, setRestaurantId] = useState(25243); // 음식점 ID
  const [rating, setRating] = useState(5.0); // 별점

  // 태그(맛, 가성비, 친절, 분위기, 주차)
  const [taste, setTaste] = useState(0);
  const [cost, setCost] = useState(0);
  const [kind, setKind] = useState(0);
  const [mood, setMood] = useState(0);
  const [park, setPark] = useState(0);

  // 별점 변화 감지
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  // 태그 체크박스 변화 감지
  const handleTagChange = (e, setState) => {
    const isChecked = e.target.checked;
    setState(isChecked ? 1 : 0);
  };

  // 리뷰 등록
  const createReview = async () => {
    console.log("RestaurantId = " + restaurantId);
    console.log("Rating = " + rating);
    console.log("Taste = " + taste);
    console.log("Cost = " + cost);
    console.log("Kind = " + kind);
    console.log("Mood = " + mood);
    console.log("Park = " + park);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
    };
    axios
      .post(
        `http://localhost:8080/api/review/${restaurantId}`,
        {
          rating: rating,
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
        alert("리뷰가 등록되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ReviewPage">
      <Header></Header>
      <div className="review-form-container">
        {/* <div className="DividingLine1" />
        <div className="restaurant-info">
          <div className="text-wrapper-2">한솥도시락구미금오공대점</div>
          <span className="star-icon">★</span>
          <p className="element">
            <span className="span">5.0</span>
            <span className="text-wrapper-3">(12)</span>
          </p>
          <p className="p">경상북도 구미시 대학로 39 (거의동 외 2필지)</p>
          <div className="text-wrapper-4">054-472-0615</div>
          <div className="overlap">
            <div className="text-wrapper-5">즐겨찾기</div>
          </div>
        </div>
        <div className="DividingLine2" /> */}
        {/* ============================================ */}
        <div className="star-rating-box">
          <span className="star-text">별점</span>
          <input
            type="radio"
            className="star"
            value="1.0"
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            className="star"
            value="2.0"
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            className="star"
            value="3.0"
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            className="star"
            value="4.0"
            onChange={handleRatingChange}
          />
          <input
            type="radio"
            className="star"
            value="5.0"
            onChange={handleRatingChange}
            checked
          />
        </div>

        {/* =========================================== */}
        <div className="review-tag-box">
          <span className="your-choice">어떤 점이 마음에 드셨나요?</span>
          <input
            type="checkbox"
            name="review-tags"
            id="taste"
            onChange={(e) => handleTagChange(e, setTaste)}
          />
          <label for="taste">맛</label>
          <input
            type="checkbox"
            name="review-tags"
            id="cost"
            onChange={(e) => handleTagChange(e, setCost)}
          />
          <label for="cost">가성비</label>
          <input
            type="checkbox"
            name="review-tags"
            id="kind"
            onChange={(e) => handleTagChange(e, setKind)}
          />
          <label for="kind">친절</label>
          <input
            type="checkbox"
            name="review-tags"
            id="mood"
            onChange={(e) => handleTagChange(e, setMood)}
          />
          <label for="mood">분위기</label>
          <input
            type="checkbox"
            name="review-tags"
            id="park"
            onChange={(e) => handleTagChange(e, setPark)}
          />
          <label for="park">주차</label>
        </div>
        {/* <div className="div-wrapper">
        <div className="text-wrapper-6">맛</div>
      </div>
      <div className="overlap-2">
        <div className="text-wrapper-7">가성비</div>
      </div>
      <div className="overlap-3">
        <div className="text-wrapper-8">주차</div>
      </div>
      <div className="overlap-4">
        <div className="text-wrapper-9">친절</div>
      </div>
      <div className="overlap-5">
        <div className="text-wrapper-7">분위기</div>
      </div> */}

        <div className="DividingLine3" />

        <div className="DividingLine4" />

        <button className="submit-btn" onClick={createReview}>
          작성하기
        </button>
      </div>
    </div>
  );
}

export default ReviewPage;
