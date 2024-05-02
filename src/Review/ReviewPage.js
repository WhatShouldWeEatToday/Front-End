import Header from "../etc/components/Header";
import "./css/ReviewPage.css";
import { useState } from "react";
import axios from "../etc/utils/apis";

function ReviewPage() {
  const [restaurantId, setRestaurantId] = useState(1);
  const [writer, setWriter] = useState(20);
  const [rating, setRating] = useState(0.0);
  const [tags, setTags] = useState({
    taste: 0,
    cost: 0,
    kind: 0,
    mood: 0,
    park: 0,
  });
  const [review, setReview] = useState([rating, tags, writer]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    setReview(e.target.value);
  };
  const handleTagChange = (e) => {
    const { id, checked } = e.target;
    setTags((prevTags) => ({
      ...prevTags,
      [id]: checked ? 1 : 0,
    }));
    setReview(e.target.value);
  };

  const createReview = async () => {
    console.log("Rating = " + rating);
    console.log("Tags = " + tags);
    console.log("Writer = " + writer);
    console.log("RestaurantId = " + restaurantId);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
    };
    axios
      .post(
        `http://localhost:8080/api/review/${restaurantId}`,
        {
          review: review,
        },
        {
          headers: headers, // 헤더 설정
        }
      )
      .then((res) => {
        console.log(res.data);
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ReviewPage">
      <Header></Header>
      <div className="review-form-container">
        {/* 리뷰 작성 버튼 */}

        <div className="DividingLine1" />
        <div className="restaurant-info">
          {/* <div className="text-wrapper-2">한솥도시락구미금오공대점</div>
          <span className="star-icon">★</span>
          <p className="element">
            <span className="span">5.0</span>
            <span className="text-wrapper-3">(12)</span>
          </p>
          <p className="p">경상북도 구미시 대학로 39 (거의동 외 2필지)</p>
          <div className="text-wrapper-4">054-472-0615</div>
          <div className="overlap">
            <div className="text-wrapper-5">즐겨찾기</div>
          </div> */}
        </div>
        <div className="DividingLine2" />
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
          />
        </div>

        {/* =========================================== */}
        <div className="review-tag-box">
          <span className="your-choice">어떤 점이 마음에 드셨나요?</span>
          <input
            type="checkbox"
            name="review-tags"
            id="taste"
            onChange={handleTagChange}
          />
          <label for="taste">맛</label>
          <input
            type="checkbox"
            name="review-tags"
            id="cost"
            onChange={handleTagChange}
          />
          <label for="cost">가성비</label>
          <input
            type="checkbox"
            name="review-tags"
            id="kind"
            onChange={handleTagChange}
          />
          <label for="kind">친절</label>
          <input
            type="checkbox"
            name="review-tags"
            id="mood"
            onChange={handleTagChange}
          />
          <label for="mood">분위기</label>
          <input
            type="checkbox"
            name="review-tags"
            id="park"
            onChange={handleTagChange}
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
