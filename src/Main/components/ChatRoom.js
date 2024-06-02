import React, { useEffect, useState } from "react";
import ChatModal from './ChatModal';
import FriendsList from './FriendsList';
import Vote from './Vote';
import "../css/ChatRoom.css";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';

function ChatRoom({ roomId, roomName, onClose, selectedFriends }) {
    const [showChatModal, setShowChatModal] = useState(false);  // 채팅 내 모달
    const [showVoteComponent, setShowVoteComponent] = useState(false); // 투표 컴포넌트
    const [stompClient, setStompClient] = useState(null);
    const [voteData, setVoteData] = useState({}); // 투표 데이터 상태 추가

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        const client = Stomp.over(socket);

        const headers = {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        };

        client.connect(headers, () => {
            setStompClient(client);
            console.log("연결 성공!");
        }, (error) => {
            console.error("연결 오류 ! : ", error);
        });

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log("연결 해제");
                });
            }
        };
    }, [roomId]);

    useEffect(() => {
        if (stompClient && stompClient.connected) {
            voteList(stompClient);
        }
    }, [stompClient]);

    const voteList = (client) => {
        if (client && client.connected) {
            client.subscribe(`/topic/room/${roomId}`, (message) => {
                const voteData = JSON.parse(message.body);
                console.log("voteData: ", voteData);
                setVoteData(voteData);
            });

            console.log("구독 시작");

            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            };

            client.send(`/app/vote/state/${roomId}`, headers, {});
            console.log("투표 정보 요청");
        } else {
            console.error("WebSocket이 연결되지 않았습니다.");
        }
    };

    // 뒤로가기 => 채팅목록/친구목록
    const [showFriendsList, setShowFriendsList] = useState(false);

    const handleBackChat = () => {
        setShowFriendsList(true);
        onClose();
    };

    if (showFriendsList) {
        return <FriendsList />;
    }

    const toggleModal = () => {
        setShowChatModal(!showChatModal);
    };

    const toggleVoteComponent = () => {
        setShowVoteComponent(!showVoteComponent);
    };

    return (
        <div className='CreateChat'>
            <div className='chat-room-header'>
                <img src={process.env.PUBLIC_URL + '/img/attention_red.png'}
                    className="notice-btn" alt='notice'
                />
                <img src={process.env.PUBLIC_URL + '/img/vote.png'}
                    className="vote-btn" alt='vote'
                    onClick={toggleVoteComponent}
                />
                <div className='chat-room-name'><h2>{roomName}</h2></div>
                <img src={process.env.PUBLIC_URL + '/img/users-group.png'}
                    className="modal-btn" alt='chatModal'
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleModal();
                    }} />
                {showChatModal &&
                    <ChatModal
                        onClose={toggleModal}
                        selectedFriends={selectedFriends}
                        handleBackChat={handleBackChat}
                        roomId={roomId}
                    />}
            </div>
            {showVoteComponent &&
                <Vote roomId={roomId}
                    selectedFriends={selectedFriends}
                    onClose={toggleVoteComponent}
                    voteData={voteData} // 투표 데이터를 전달
                    setVoteData={setVoteData} // 투표 데이터를 업데이트하는 함수 전달
                />}
        </div>
    );
}

export default ChatRoom;
