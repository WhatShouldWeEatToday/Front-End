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
    const [restLen, setRestLen] = useState(0); // 검색 데이터
    const [paginationType, setPaginationType] = useState();

    useEffect(() => {
        if(!search){
            fetchData();
        } else{
            ClickSearch();
        }
    }, [page, search, paginationType]);

    const fetchData = async () => {
        try{
            let apiURL = '';
            if(paginationType === 'degree'){
                apiURL = 'http://localhost:8080/restaurant/search/degree?'; //별점순
            } else if(paginationType === 'reviews'){
                apiURL = 'http://localhost:8080/restaurant/search/reviews?'; //리뷰순
            } else if(paginationType === 'distance'){
                apiURL = `http://localhost:8080/restaurant/search/routes?startX=${lat}&startY=${lon}&`; //거리순
            } else if(paginationType === 'onlycafe'){
                apiURL = 'http://localhost:8080/restaurant/search/onlycafes?';
            } else if(paginationType === 'onlyrest'){
                apiURL = 'http://localhost:8080/restaurant/search/onlyrestaurants?';
            } else {
                apiURL = 'http://localhost:8080/restaurant/findAll?';
            }
            const response = await axios.get(`${apiURL}page=${page}`);

            const { content, totalPages, numberOfElements} = response.data; //데이터 받기
            setRestaurant(content);
            setTotalPages(totalPages);
            setRestLen(numberOfElements);

            console.log("현재데이터", content);
            console.log("총 페이지 갯수: ", response.data);

        } catch (err){
            console.log({error: err});
        }
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePaginationTypeChange = (type) => {
        setPaginationType(type);
        setPage(1);
        fetchData();
    }
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
           console.log("검색결과: ",content);

        } catch (err){
            console.log({error: err});
        }
    };

    //목록별 조회 - 거리순
    const [lat, setLat] = useState(); // 위도
    const [lon, setLon] = useState(); // 경도

    console.log("현재 위경도", lat, lon);
    
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
                    <button className="list-btn" onClick={() => handlePaginationTypeChange('distance')}>거리순</button>
                    <button className="list-btn" onClick={() => handlePaginationTypeChange('degree')}>별점순</button>
                    <button className="list-btn" onClick={() => handlePaginationTypeChange('reviews')}>리뷰순</button>
                </div>
                <div className="collect-categori">
                    <button className="categori-btn" onClick={() => handlePaginationTypeChange('onlyrest')}>음식점</button>
                    <button className="categori-btn" onClick={() => handlePaginationTypeChange('onlycafe')}>카페</button>
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