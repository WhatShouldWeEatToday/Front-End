import "../css/StarRating.css";
import { useState } from "react";

function StarRating({ onRatingChange }) {
  const [rating, setRating] = useState(5.0);
  const [hover, setHover] = useState(null);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    onRatingChange(ratingValue); // 부모 컴포넌트로 별점 전달
  };

  return (
    <div className="star-rating-box">
      <span className="star-text">별점</span>
      <div className="stars">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label
              key={index}
              className="star-label"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              onClick={() => handleClick(ratingValue)}
            >
              <input type="radio" className="star" value={ratingValue} />
              <span className="star-rating-icon">
                {ratingValue <= (hover || rating) ? "★" : "☆"}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default StarRating;
