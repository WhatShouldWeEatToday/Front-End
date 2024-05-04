import React, { useState, useEffect } from "react";
import '../css/SearchSession.css';
import Map from "./Map";
import axios from "../../etc/utils/apis";
import Pagination from "./Pagination";

function SearchSession() {
    //통신데이터(맛집데이터) 저장
    const [restaurant, setRestaurant] = useState([]);

    //검색데이터 저장
    const [search, setSearch] = useState('');

    /*Pagination*/
    const [page, setPage] = useState(1); //페이지 숫자
    const [totalPages, setTotalPages] = useState(0); //전체 데이터 수
    const [restLen, setRestLen] = useState(0); // 검색 데이터 수

    useEffect(() => {
        if(!search){
            getRestaurant();
        } else{
            ClickSearch();
        }
    }, [page, search]);

    //전체 음식점 조회
    const getRestaurant = async () => {
        try{
            const respone = await axios
            .get(`http://localhost:8080/restaurant/findAll?page=${page}`);
           const {content, totalPages, numberOfElements } = respone.data; //데이터 받아오기
           setRestaurant(content);
           setTotalPages(totalPages);
           setRestLen(numberOfElements);


        } catch (err){
            console.log({error: err});
        }
    };

     //검색어 상태 업데이트
     const getValue = (e) => {
        setSearch(e.target.value.toLowerCase());
        setPage(1); //검색어 변경시 첫번째 페이지로 이동
    }   

    // 검색어 보내기
    const ClickSearch = async () => {
        try{
            const respone = await axios
            .get(`http://localhost:8080/restaurant/search?word=${search}&page=${page}`);
            const {content, totalPages, numberOfElements } = respone.data; //데이터 받아오기
           setRestaurant(content);
           setTotalPages(totalPages);
           setRestLen(numberOfElements);

        } catch (err){
            console.log({error: err});
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    //목록별 조회 - 거리순
    const [lat, setLat] = useState(); // 위도
    const [lon, setLon] = useState(); // 경도

    console.log("현재 위경도: ", lat, lon);
    
     const getDistance = async () =>{
        try{
            const response = await axios
            .get(`http://localhost:8080/restaurant/search/routes?startX=${lat}&startY=${lon}`);
            const {content, totalPages, numberOfElements } = response.data; //데이터 받아오기
            setRestaurant(content);
            setTotalPages(totalPages);
            setRestLen(numberOfElements);

            console.log("거리순 작동");
            console.log("거리순:", content);

        } catch (err){
            console.log({error: err});
        }
     }

    //목록별 조회 - 별점순
    const getDegree = async () => {
        try{
            const response = await axios
            .get(`http://localhost:8080/restaurant/search/degree?page=${page}`);
            const {content, totalPages, numberOfElements } = response.data; //데이터 받아오기
            setRestaurant(content);
            setTotalPages(totalPages);
            setRestLen(numberOfElements);

            console.log("별점순 작동");
            console.log(restaurant);

        } catch (err){
            console.log({error: err});
        }
    };

    // const handleStarClick = () => {
    //     setPage(1); // 버튼 클릭 시 페이지 초기화
    //     getDegree(); // 별점순 목록 조회 함수 호출
    // };

    //목록별 조회 - 리뷰순
    const getReviw = async () => {
        try{
            const response = await axios
            .get(`http://localhost:8080/restaurant/search/reviews?page=${page}`);
            const {content, totalPages, numberOfElements } = response.data; //데이터 받아오기
            setRestaurant(content);
            setTotalPages(totalPages);
            setRestLen(numberOfElements);
            setPage(1); // 페이지 초기화

            console.log("리뷰순 작동");
        } catch (err){
            console.log({error: err});
        }
    };

    //음식점 목록
    const getOnlyRestuarant = async () => {
        try{
            const respone = await axios
            .get(`http://localhost:8080/restaurant/search/onlyrestaurants`);
            const {content, totalPages, numberOfElements } = respone.data; //데이터 받아오기
            setRestaurant(content);
            setTotalPages(totalPages);
            setRestLen(numberOfElements);
            setPage(1);

            console.log("음식점 작동");
        } catch (err){
            console.log({error: err});
        }
    };

    // 카페 목록
    const getOnlyCafe = async () => {
        try{
            const respone = await axios
            .get(`http://localhost:8080/restaurant/search/onlycafes`);
            const {content, totalPages, numberOfElements } = respone.data; //데이터 받아오기
            setRestaurant(content);
            setTotalPages(totalPages);
            setRestLen(numberOfElements);
            setPage(1);

            console.log("카페 작동");
        } catch (err){
            console.log({error: err});
        }
    };

    //음식점을 클릭했는지
    const [selectRest, setSelectRest] = useState(null);

    //음식점 클릭이벤트
    const clickRestaurant = (select) => {
        setSelectRest(select);
    };

    const items = restaurant.map(data =>{
        return(
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
        )
    })
    return (
        <div className='SearchSession'>
           <div className="search-bar-area">
                <div className="search-word">검색</div>
                    <input
                    type="serach"
                    className="search-bar"
                    onChange={getValue}>
                    </input>
                    <img src={process.env.PUBLIC_URL + '/img/yellow_search.png'}
                        className="search_icon"
                        alt='search'
                        onClick={ClickSearch}
                        />
            </div>
            <div className="search-map-area">
            <Map restaurant={search ? restaurant : (selectRest ? [selectRest] : restaurant)}
                restLen={restLen}
                setLat={setLat} setLon={setLon}/>

            </div>
           <div className="collect-area">
                <div className="collect-list">
                    <button className="list-btn" onClick={getDistance}>거리순</button>
                    <button className="list-btn" onClick={getDegree}>별점순</button>
                    <button className="list-btn" onClick={getReviw}>리뷰순</button>
                </div>
                <div className="collect-categori">
                    <button className="categori-btn" onClick={getOnlyRestuarant}>음식점</button>
                    <button className="categori-btn" onClick={getOnlyCafe}>카페</button>
                </div>
           </div>
           {items}
           <Pagination
                page={page}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}
export default SearchSession;