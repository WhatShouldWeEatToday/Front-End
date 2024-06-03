import { useState, useEffect } from "react";
import "../css/Departure.css";
import PostCode from 'react-daum-postcode';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function Departure ({ roomId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [address, setAddress] = useState('');

    const handleComplete = (data) => {
        const { address } = data;
        if (address.includes("구미")) {
            setAddress(address);
        } else {
            alert("출발지를 구미 내로 설정해주세요.");
        }
    };

    const handleCloser = (state) => {
        if (state === 'FORSE_CLOSE' || state === 'COMPLETE_CLOSE') {
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
                console.log("출발지 반환 !!!!!!!!!!", response);
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
        </div>
    );
}

export default Departure;
