import Header from "../etc/components/Header";
import ReceiptAuth from "./components/ReceiptAuth";
import "./css/ReceiptAuthPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../etc/utils/apis";

function ReceiptAuthPage() {
  const { restaurantId } = useParams(); // 음식점 ID
  const [starRating, setStarRating] = useState(5.0); // 별점 상태
  const [name, setName] = useState(""); // 음식점 이름
  const [address, setAddress] = useState(""); // 음식점 주소(도로명)
  const [tel, setTel] = useState(""); // 전화번호
  const [degree, setDegree] = useState(0); // 별점
  const [totalReviews, setTotalReviews] = useState(0); // 총 리뷰 개수

  useEffect(() => {
    getRestaurantDetails();
  }, [restaurantId]);

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
    <div className="ReceiptAuthPage">
      <Header />
      <div className="receipt-auth-container">
        <div className="restaurant-info">
          <div className="restaurant-name">{name}</div>
          <div className="restaurant-address">{address}</div>
          <div className="restaurant-tel">{tel}</div>
          <div className="star-rating-info">
            <span className="star-icon">★</span>
            <span className="star-degree">{degree}</span>
            <span className="total-reviews">({totalReviews})</span>
          </div>
        </div>
        <ReceiptAuth restaurantId={restaurantId}></ReceiptAuth>
      </div>
    </div>
  );
}
export default ReceiptAuthPage;
