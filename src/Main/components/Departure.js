import { useState, useEffect } from "react";
import "../css/Departure.css";
import PostCode from 'react-daum-postcode';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from "axios";

function Departure ({ roomId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [address, setAddress] = useState('');
    const [addressList, setAddressList] = useState([]);
    const [recomand, setRecomand] = useState([]); // 3개의 추천 맛집 저장
    const [meetMenu, setMeetMenu] = useState('');
    const [course, setCourse] = useState(null);
    const [meetDate, setMeetDate] = useState('');

    const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
    };

    const handleComplete = (data) => {
        const { address } = data;
        if (address.includes("구미")) {
            setAddress(address);
        } else {
            alert("출발지를 구미 내로 설정해주세요.");
        }
    };

    const handleCloser = (state) => {
        if (state === 'FORCE_CLOSE' || state === 'COMPLETE_CLOSE') {
            setIsOpen(false);
        }
    };

    const handleToggle = () => {
        setIsOpen((prevOpenState) => !prevOpenState);
    };

    const handleDepature = () => {
        if (address) {
            console.log(address);
            handleSubmitAddress(stompClient);
            alert("출발지가 등록되었습니다.");
        } else {
            alert("출발지를 등록해주세요.");
        }
    }

    const recomandThird = async (addressList, meetMenu) => {
        const requestDTO = {
            keyword: meetMenu,
            startAddress: addressList,
            searchDttm: meetDate,
        }
        try {
            const response = await axios.post("http://localhost:8080/restaurant/search/getWeight", requestDTO, { headers });
            console.log("최종선정 맛집 3곳", response.data);
            if (response.data.length > 0) {
                setRecomand(response.data);
            }
        } catch (err) {
            console.log({ error: err });
        }
    }

    // 맛집 3개 리스트 보여주기
    const thirdRecomandRestaurant = recomand.map((data) => {
        const { id, name, addressRoad, tel, degree, totalReviews } = data.restaurantResponseDTO;
        return (
            <div className="ThirdRecomandRestaurant">
                <div className="recomandRestaurant-list" key={id}>
                    <div className="recomandRestaurant-name">{name}</div>
                    <div className="recomandRestaurant-addressRoad">주소 : {addressRoad}</div>
                    <div className="recomandRestaurant-tel">tel: {tel}</div>
                    <div className="recomandRestaurant-infor">별점:{degree}  리뷰수: ({totalReviews})</div>
                    <div className="recomandRestaurant-btn-area">
                        <button className="clickCourse" onClick={() => clickCourse(addressRoad, name)}>경로보기</button>
                    </div>
                </div>
            </div>
        );
    });

    // 경로보기 버튼 누르면 팝업
    const clickCourse = async (destination, restaurantName) => {
        if (address) {
            try {
                const response = await axios.post("http://localhost:8080/restaurant/search/getPath", {
                    departure: address,
                    destination: destination,
                    searchDttm: meetDate
                });

                console.log("response 파일", response);
                setCourse(response.data);
                localStorage.setItem('courseData', JSON.stringify(response.data)); // 경로 데이터를 localStorage에 저장
                console.log("경로 데이터 파일", response.data);
                onPopup(restaurantName); // 맛집 이름을 인수로 전달
            } catch (err) {
                console.log({ error: err });
            }
        } else {
            alert("주소를 입력해주세요");
        }
    }

    // 팝업창 경로 안내
    const onPopup = (restaurantName) => {
        const url = `restaurant/course?restaurantName=${encodeURIComponent(restaurantName)}`;
        window.open(url, "_blank", "noopener, noreferrer");
    }

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        const client = Stomp.over(socket);

        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        };

        client.connect(headers, () => {
            setStompClient(client);
            console.log('WebSocket 연결 성공');

            client.subscribe(`/topic/room/${roomId}`, (message) => {
                const response = JSON.parse(message.body);
                console.log("출발지 반환 !!!!!!!!!!", response.body);
                console.log("메뉴!!!!!!!!!", response.body.meetMenu);
                console.log("출발지 리스트 !!!!!!!!!!", response.body.departureList);
                setAddressList(response.body.departureList); // 출발지 리스트 저장
                setMeetMenu(response.body.meetMenu); // 찾을 메뉴 전달 meetDate
                setMeetDate(response.body.meetDate);
            });
        }, (error) => {
            console.error('WebSocket 연결 오류', error);
        });

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('WebSocket 연결 해제');
                });
            }
        };
    }, [roomId]);

    useEffect(() => {
        if (addressList.length > 0 && meetMenu) { 
            recomandThird(addressList, meetMenu);
        }
    }, [addressList, meetMenu, meetDate]);

    // 사용자들의 주소 보내기
    const handleSubmitAddress = (client) => {
        if (client && client.connected) {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            };

            client.send(`/app/departure/register/${roomId}`, headers, address); // 주소를 문자열로 보냄
        } else {
            console.error("WebSocket이 연결되지 않았습니다.");
        }
    };

    return (
        <div className="Departure-area">
            <div className="depature-chat">
                <div className="depature-setting">
                    <div className="address-area">
                        <div className="address-name">
                            현 주소:
                        </div> 
                        <button
                            className="search-address"
                            type="button"
                            onClick={handleToggle}>
                            주소 찾기
                        </button>
                    </div>
                    {isOpen && (
                    <div>
                        <PostCode
                            className="postcode"
                            onComplete={handleComplete}
                            onClose={handleCloser}
                        />
                    </div>
                    )}
                    <div className="mem-address">
                        <div className="mem-add">{address}</div>
                    </div>
                    <button
                        className="addressClick"
                        type="button"                                                    
                        onClick={handleDepature}>
                            출발지 등록
                    </button>
                </div>
            </div>
            <div className="third-area">
                {thirdRecomandRestaurant}
            </div>
        </div>
    );
}

export default Departure;
