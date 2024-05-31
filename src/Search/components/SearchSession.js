import React, { useState, useEffect } from "react";
import '../css/SearchSession.css';
import Map from "./Map";
import axios from "../../etc/utils/apis";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

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
            console.log(content);
            setTotalPages(totalPages - 1);
            setRestLen(numberOfElements);

        } catch (err){
            console.log({error: err});
        }
    }

    //페이지 변경
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    //데이터 타입 변경
    const handlePaginationTypeChange = (type) => {
        setPaginationType(type);
        setPage(1);
        setBtnSelected(type);
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
           setTotalPages(totalPages - 1);
           setRestLen(numberOfElements);

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

    //즐겨찾기 - axios api 수정중
    const clickBookmark = async (restaurant_id) => {
        alert("등록되었습니다.");
        try{
            const response = await axios
            .post(`http://localhost:8080/api/restaurant/bookmark/${restaurant_id}`,
                {
                    bookmark_id : restaurant_id //즐겨찾기 할 맛집 아이디 전달
                }
            );
            console.log("response data : ", response.data);
        }catch(err){
            console.log({error: err});
        }
    }

    //카테고리 선택
    const [btnSelected, setBtnSelected] = useState(null);

    const items = restaurant.map(data =>{
        return(
            <div className="restaurant-list-area"
                onClick={() => clickRestaurant(data)}
                key={data.id}>
                <div className="restaurant-name">{data.name}</div>
                <div className="restaurant-address">{data.addressRoad}</div>
                <div className="restaurant-number">{data.tel}</div>
                <div className="restaurant-stars">
                    <div className="restaurant-star">★</div>
                    <div className="restaurant-starCount">{data.degree} </div>
                    <div className="restaurant-review">({data.totalReviews})</div>
                </div>
                <div className="restaurant-btn-area">
                    <button className="restaurant-btn" onClick={() => clickBookmark(data.id)}>즐겨찾기</button>
                    <button className="restaurant-btn" >
                        <Link to={`/restaurant/${data.id}/review`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        >리뷰보기</Link>
                    </button>
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
                    <button className={`list-btn ${btnSelected === 'distance' ? 'selected' : ''}`}
                    onClick={() => handlePaginationTypeChange('distance')}>거리순</button>
                    <button className={`list-btn ${btnSelected === 'degree' ? 'selected' : ''}`}
                    onClick={() => handlePaginationTypeChange('degree')}>별점순</button>
                    <button className={`list-btn ${btnSelected === 'reviews' ? 'selected' : ''}`}
                    onClick={() => handlePaginationTypeChange('reviews')}>리뷰순</button>
                </div>
                <div className="collect-categori">
                    <button className={`categori-btn ${btnSelected === 'onlyrest' ? 'selected' : ''}`}
                    onClick={() => handlePaginationTypeChange('onlyrest')}>음식점</button>
                    <button className={`categori-btn ${btnSelected === 'onlycafe' ? 'selected' : ''}`}
                    onClick={() => handlePaginationTypeChange('onlycafe')}>카페</button>
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