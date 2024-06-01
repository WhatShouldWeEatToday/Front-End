import "./css/RestaurantDetailsPage.css";
import Header from "../etc/components/Header";
import RestaurantInfo from "./components/RestaurantInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

function RestaurantDetailsPage() {
  const { restaurantId } = useParams(); // 음식점 ID
  return (
    <div className="RestaurantDetailsPage">
      <Header />
      <div className="restaurant-details-container">
        <RestaurantInfo restaurantId={restaurantId} />
      </div>
    </div>
  );
}
export default RestaurantDetailsPage;
