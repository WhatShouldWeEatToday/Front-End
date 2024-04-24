import React, { useState, useEffect } from "react";
import '../css/SearchSession.css';
import Map from "./Map";
import axios from "axios";

function SearchSession() {

    //통신데이터(맛집데이터) 저장
    const [restaurant, setRestaurant] = useState([]);

    //검색데이터 저장
    const [search, setSearch] = useState('');

    //axios 통신
    const getRestaurant = async () => {
        try{
            const respone = await axios
            .get("http://localhost:8080/restaurant/findAll");
            setRestaurant(respone.data.content);
        } catch (err){
            console.log({error: err});
        }
    };

    useEffect(() =>{
        getRestaurant();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            getRestaurant();
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const restLen = restaurant.length;

    //검색어 상태 업데이트
    const getValue = (e) => {
        setSearch(e.target.value.toLowerCase())
    };

    //검색 데이터 필터링
    const serched = restaurant.filter((item) => 
        item.name.toLowerCase().includes(search));

    const items = serched.map(data =>{
        return(
            <div className="restaurant-list-area" key={data.id}>
                <div className="restaurant-name">{data.name}</div>
                <div className="restaurant-address">{data.addressRoad}</div>
                <div className="restaurant-number">{data.tel}</div>
                <div className="restaurant-stars">별점 :{data.degree}</div>
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
                <Map restaurant={restaurant} restLen={restLen}/>
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