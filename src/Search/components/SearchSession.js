import React, { useState } from "react";
import '../css/SearchSession.css';
import Map from "./Map";

const Information = [
    {
        restaurant_id: 1,
        name : "부곡동보리밥뷔페",
        address_road: "경북 구미시 야은로 132 1층",
        tel : "010-2271-4738"
    },
    {
        restaurant_id: 2,
        name : "파네룬",
        address_road: "경북 구미시 야은로7길 47 1층, 2층",
        tel : "070-4230-6543"
    },
    {
        restaurant_id: 3,
        name : "기와집",
        address_road: "경북 구미시 야은로 133",
        tel : "054-442-6007"
    },
    {
        restaurant_id: 4,
        name : "모미지",
        address_road: "경북 구미시 부곡길 119 1층",
        tel : "010-8938-0326"
    },
    {
        restaurant_id: 5,
        name : "삼거리메밀막국수",
        address_road: "경북 구미시 송선로 209-3",
        tel : "054-452-1945"
    },
    {
        restaurant_id: 6,
        name : "고향가마솥추어탕 본점",
        address_road: "경북 구미시 야은로 128",
        tel : "054-443-8877"
    }
]

function SearchSession() {
    const [search, setSearch] = useState('');
    const getValue = (e) => {
        setSearch(e.target.value.toLowerCase())
    };
    const serched = Information.filter((item) => 
        item.name.toLowerCase().includes(search));

    const items = serched.map(data =>{
        return(
            <div className="restaurant-list-area">
                <div className="restaurant-name">{data.name}</div>
                <div className="restaurant-address">{data.address_road}</div>
                <div className="restaurant-number">{data.tel}</div>
                <div className="restaurant-stars">별점</div>
                <div className="restaurant-btn-area">
                    <button className="restaurant-btn">즐겨찾기</button>
                    <button className="restaurant-btn">리뷰보기</button>
                </div>
            </div>
        )
    })

    
    
    return (
        <div className='SearchSession'>
           <div className="search-bar-area">
                <div className="search-word">검색</div>
                    <input
                    type="serach"
                    className="search-bar"
                    // onChange={event => {setSearch(event.target.value)}}>
                    onChange={getValue}>
                    </input>
            </div>
            <div className="search-map-area">
                <Map/>
            </div>
           <div className="collect-area">
                <div className="collect-list">
                    <button className="list-btn">거리순</button>
                    <button className="list-btn">별점순</button>
                    <button className="list-btn">리뷰순</button>
                </div>
                <div className="collect-categori">
                    <button className="categori-btn">음식점</button>
                    <button className="categori-btn">카페</button>
                </div>
           </div>
           {items}
        </div>
    );
}

export default SearchSession;