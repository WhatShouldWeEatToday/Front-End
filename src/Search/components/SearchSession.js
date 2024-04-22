import React, { useEffect, useState } from "react";
import '../css/SearchSession.css';
import Map from "./Map";
import axios from "axios";

function SearchSession() {

    //통신데이터저장
    const [data, setData] = useState([]);
    //axios 통신
    const getData = async () => {
        try{
            const respone = await axios
            .get("http://localhost:8080/restaurant/findAll");
            setData(respone.data.content);
        } catch (err){
            console.log({error: err});
        }
    };

    useEffect(() =>{
        getData();
    }, []);

    console.log(data); //data 확인용 콘솔

    const [search, setSearch] = useState('');
    const getValue = (e) => {
        setSearch(e.target.value.toLowerCase())
    };

    const serched = data.filter((item) => 
        item.name.toLowerCase().includes(search));

    const items = serched.map(data =>{
        return(
            <div className="restaurant-list-area" key={data.id}>
                <div className="restaurant-name">{data.name}</div>
                <div className="restaurant-address">{data.address_road}</div>
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