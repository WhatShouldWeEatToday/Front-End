import React, { useEffect, useRef, useState } from "react";
import "../css/ChatModal.css";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function ChatModal({ onClose, selectedFriends, handleBackChat, roomId }) {
    const modalRef = useRef();
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    const modalHeight = Math.min(selectedFriends.length * 30 + 60, 400); // 최대 높이 400px로 제한

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        const client = Stomp.over(socket);

        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, // localStorage에서 저장된 accessToken을 가져와서 헤더에 포함
        };

        client.connect(headers, () => {
            setStompClient(client);
            console.log('WebSocket 연결 성공');
            
            client.subscribe(`/topic/${roomId}`, (message) => {
                const chatMsg = JSON.parse(message.body).content;
                console.log("채팅방 나가기 메시지: ", chatMsg);
                if (chatMsg.messageType === "LEAVE") {
                    alert(chatMsg.content);
                }
            });
        });

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('WebSocket 연결 해제');
                });
            }
        };
    }, [roomId]);

    // 채팅방 나가기
    const leaveChat = () => {
        if (stompClient && stompClient.connected) {
            stompClient.send(`/app/chat.endRoom/${roomId}`, {});
        }
    };

    return (
        <div
            className="ChatModal"
            ref={modalRef}
            style={{ height: `${modalHeight}px` }}
        >
            <div className="chatfriend-list">
                참여자 목록
                {selectedFriends.map(friend => (
                    <div className="chat-friend" key={friend.friendLoginId}>
                        {friend.friendNickname} ({friend.friendLoginId})
                    </div>
                ))}
            </div>
            <div className="back-chat" onClick={handleBackChat}>뒤로가기</div>
            <div className="leave" onClick={leaveChat}>채팅방 나가기</div>
        </div>
    );
}

export default ChatModal;
