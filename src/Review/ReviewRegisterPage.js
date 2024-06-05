import Header from "../etc/components/Header";
import StarRating from "./components/StarRating";
import "./css/ReviewRegisterPage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../etc/utils/apis";

function ReviewRegisterPage() {
  const navigate = useNavigate();

  const { restaurantId, authStatus } = useParams(); // 음식점 ID
  const [starRating, setStarRating] = useState(5.0); // 별점 상태
  const [name, setName] = useState(""); // 음식점 이름
  const [address, setAddress] = useState(""); // 음식점 주소(도로명)
  const [tel, setTel] = useState(""); // 전화번호
  const [degree, setDegree] = useState(0); // 별점
  const [totalReviews, setTotalReviews] = useState(0); // 총 리뷰 개수

  useEffect(() => {
    getRestaurantDetails();
  }, [restaurantId, totalReviews]);

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

  // 리뷰 등록
  const createReview = async () => {
    console.log("RestaurantId = " + restaurantId);
    console.log("StarRating = " + starRating);
    console.log("Taste = " + taste);
    console.log("Cost = " + cost);
    console.log("Kind = " + kind);
    console.log("Mood = " + mood);
    console.log("Park = " + park);
    console.log("AuthStatus = " + authStatus);
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
    };
    axios
      .post(
        `http://localhost:8080/api/review/${restaurantId}`,
        {
          // 컬럼명: 값
          stars: starRating,
          taste: taste,
          cost: cost,
          kind: kind,
          mood: mood,
          park: park,
          reviewType: authStatus,
        },
        {
          headers: headers, // 헤더 설정
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("리뷰가 등록되었습니다.");
        navigate(`/restaurant/${restaurantId}/review`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRestaurantDetails = async () => {
    axios
      .get(`http://localhost:8080/restaurant/${restaurantId}/details`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setAddress(res.data.addressRoad);
        setTel(res.data.tel);
        setDegree(res.data.degree);
        setTotalReviews(res.data.totalReviews);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ReviewRegisterPage">
      <Header />
      <div className="review-form-container">
        {/* 음식점 정보 */}
        <div className="restaurant-info">
          <div className="restaurant-name">{name}</div>
          <div className="restaurant-address">{address}</div>
          <div className="restaurant-tel">{tel}</div>
          <div className="star-rating-info">
            <span className="star-icon">★</span>
            <span className="star-degree">{degree}</span>
            <span className="total-reviews">({totalReviews})</span>
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
        <button className="submit-btn" onClick={createReview}>
          작성하기
        </button>
      </div>
    </div>
  );
}

export default ReviewRegisterPage;
