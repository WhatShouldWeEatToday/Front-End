import React from "react";

function RestaurantList({data, clickRestaurant}) {
    return (
        <div className="restaurant-list-area"
                onClick={() => clickRestaurant(data)}
                key={data.id}>
                <div className="restaurant-name">{data.name}</div>
                <div className="restaurant-address">{data.addressRoad}</div>
                <div className="restaurant-number">{data.tel}</div>
                <div className="restaurant-stars">별점 :{data.degree}</div>
                <div className="restaurant-stars">리뷰 :{data.totalReviews}</div>
                <div className="restaurant-btn-area">
                    <button className="restaurant-btn">즐겨찾기</button>
                    <button className="restaurant-btn">리뷰보기</button>
                </div>
            </div>
    );
}

export default RestaurantList;